"""Twenty synthetic, offline reliability experiments. No challenge data/scorer.

Run python3 tools/experiments.py --lesson 01 --seed 7, or --all.
These calculations illustrate mechanisms; they do not estimate a board score.
"""
import argparse
import hashlib
import json
from pathlib import Path
import numpy as np


def norm(c):
    return np.log1p(c*10000/np.maximum(c.sum(1,keepdims=True),1))


def recover(x):
    y=np.expm1(x);u=np.where(y>0,y,np.inf).min(1)
    u[~np.isfinite(u)]=1
    return np.rint(y/u[:,None])


def ranks(x):
    x=np.asarray(x);order=np.argsort(x);out=np.empty(len(x),float)
    for v in np.unique(x):
        ix=np.flatnonzero(x==v);out[ix]=np.flatnonzero(x[order]==v).mean()
    return out


def rho(a,b):
    a,b=ranks(a),ranks(b)
    if not a.std() or not b.std():return None
    return float(np.corrcoef(a,b)[0,1])


def experiment(lesson,seed=7):
    r=np.random.default_rng(seed)
    if lesson==1:
        c=np.array([[2.,4.,8.],[1.,3.,5.]])
        got=recover(norm(c))
        assert np.array_equal(got[0],c[0]/2) and np.array_equal(got[1],c[1])
        return dict(input_counts=c.tolist(),recovered_counts=got.tolist(),
                    exact_rows=int((got==c).all(1).sum()),lesson='Normalization loses a common integer factor.')
    if lesson==2:
        c=np.array([.2,.7,1.4,3.8]);n=100000
        rounded=np.floor(c)+(r.random((n,len(c)))<c%1)
        err=float(np.max(abs(rounded.mean(0)-c)))
        assert err<.02
        return dict(target=c.tolist(),floor=np.floor(c).tolist(),randomized_mean=rounded.mean(0).tolist(),max_error=err)
    if lesson==3:
        x=np.array([0.,0.,1.,3.]);d=-.5
        intended=float(x.mean()+d);actual=float(np.maximum(x+d,0).mean())
        assert actual>intended
        return dict(original_mean=float(x.mean()),shift=d,intended_mean=intended,clipped_mean=actual)
    if lesson==4:
        x=np.array([0.,0.,0.,0.,2.]);support=np.array([.9,.8,.2,.1,2.])
        random_on=np.sort(r.choice(4,2,replace=False));coherent_on=np.argsort(support[:4])[-2:]
        assert set(coherent_on)=={0,1}
        return dict(zero_cells=[0,1,2,3],random_activation=random_on.tolist(),supported_activation=coherent_on.tolist(),support=support.tolist())
    if lesson==5:
        a=np.array([[10.,0.]]);b=np.array([[0.,1.]])
        first=norm((a+b)/2);last=(norm(a)+norm(b))/2
        delta=float(np.linalg.norm(first-last));assert delta>1
        return dict(normalize_after_mix=first[0].tolist(),mix_after_normalize=last[0].tolist(),difference=delta)
    if lesson==6:
        early=np.array([900,100]);late=np.array([90,100])
        p=early/early.sum();q=late/late.sum()
        assert q[1]>p[1]
        return dict(early_counts=early.tolist(),late_counts=late.tolist(),early_fraction=p.tolist(),late_fraction=q.tolist(),
                    unchanged_heart_count=True,warning='A changed observed fraction need not mean more heart cells.')
    if lesson==7:
        a=np.array([[0.],[2.]]);b=np.array([[.1],[2.1]])
        k=lambda x,y:np.exp(-((x[:,None]-y[None])**2).sum(2)/2)
        ka,kb,kab=k(a,a),k(b,b),k(a,b)
        unbiased=float((ka.sum()-np.trace(ka))/2+(kb.sum()-np.trace(kb))/2-2*kab.mean())
        biased=float(ka.mean()+kb.mean()-2*kab.mean());assert unbiased<0<=biased
        return dict(unbiased_mmd_squared=unbiased,biased_mmd_squared=biased,population_distance_nonnegative=True)
    if lesson==8:
        # Same unit segment, different sample sizes: a fixed neighbour count spans a different scale.
        extents={str(n):float(np.arange(n)[min(15,n-1)]/(n-1)) for n in [100,1000,10000]}
        assert extents['100']>extents['1000']>extents['10000']
        return dict(domain_length=1,fixed_neighbor_count=15,physical_span=extents)
    if lesson==9:
        c=np.diag([1.,1.,.1]);pert=np.array([[0,1e-8,0],[1e-8,0,0],[0,0,0]])
        wa,va=np.linalg.eigh(c);wb,vb=np.linalg.eigh(c+pert)
        angle=float(np.degrees(np.arccos(np.clip(abs(va[:,-1]@vb[:,-1]),0,1))))
        assert angle>40
        return dict(covariance_perturbation=float(np.linalg.norm(pert)),principal_axis_angle_degrees=angle,eigenvalues=wa.tolist())
    if lesson==10:
        a=r.normal(size=(100,3));b=a*np.array([-1,1,1]);u,_,vt=np.linalg.svd(a.T@b)
        free=u@vt;proper=u@np.diag([1,1,np.linalg.det(u@vt)])@vt
        assert np.linalg.det(proper)>.99 and np.linalg.det(free)<-.99
        return dict(unconstrained_determinant=float(np.linalg.det(free)),proper_determinant=float(np.linalg.det(proper)),
                    unconstrained_error=float(np.linalg.norm(a@free-b)),proper_error=float(np.linalg.norm(a@proper-b)))
    if lesson==11:
        a,b=100.,400.;linear=(a+b)/2;log=np.sqrt(a*b)
        assert linear==250 and log==200
        return dict(early_radius=a,late_radius=b,linear_midpoint=linear,constant_log_growth_midpoint=log)
    if lesson==12:
        c=r.normal(size=(10000,3));size=lambda z:float(np.sqrt(((z-z.mean(0))**2).sum(1).mean()))
        crop=c[np.linalg.norm(c,axis=1)<1.5]
        assert size(crop)<size(c)
        return dict(full_rms=size(c),cropped_rms=size(crop),retained_cells=len(crop),biological_growth=0)
    if lesson==13:
        early=np.array([[1.,4.],[5.,2.],[3.,8.]]);technical=np.array([-1.,.5]);bio=np.array([[0.,1.],[0.,-1.],[0.,0.]])
        late=early+technical+bio;delta=late-early;common=np.median(delta,axis=0)
        assert np.allclose(common,technical)
        return dict(observed_type_deltas=delta.tolist(),common_component=common.tolist(),residual=(delta-common).tolist(),
                    caveat='Common biology and batch remain confounded without additional assumptions.')
    if lesson==14:
        local=[1.,2.,2.,4.];real=[4.,2.,2.,1.];corr=rho(local,real)
        assert np.isclose(corr,-1)
        return dict(local_scores=local,official_scores=real,tie_aware_spearman=corr,constant_series_correlation=rho([1,1,1],[2,3,4]))
    if lesson==15:
        cells=np.repeat(np.arange(6),20);perm=r.permutation(len(cells));cut=len(cells)//2
        cell_overlap=set(cells[perm[:cut]])&set(cells[perm[cut:]])
        train=cells[cells<3];test=cells[cells>=3];group_overlap=set(train)&set(test)
        assert len(cell_overlap)>0 and not group_overlap
        return dict(cell_split_shared_specimens=len(cell_overlap),specimen_split_shared_specimens=len(group_overlap),total_specimens=6)
    if lesson==16:
        family=np.repeat(np.arange(4),4);signal=np.repeat([1.,2.,3.,4.],4);local=signal+r.normal(0,.005,len(signal));real=signal+r.normal(0,.005,len(signal))
        within=[rho(local[family==f],real[family==f]) for f in range(4)]
        return dict(pooled_spearman=rho(local,real),within_family_spearman=within,independent_families=4,variants=16,
                    lesson='Many variants do not create many independent method families.')
    if lesson==17:
        mu0=np.array([1.,8.]);mu1=np.array([2.,9.]);p0=np.array([.1,.9]);p1=np.array([.9,.1])
        before=float(p0@mu0);after=float(p1@mu1)
        assert (mu1>mu0).all() and after<before
        return dict(type_means_before=mu0.tolist(),type_means_after=mu1.tolist(),aggregate_before=before,aggregate_after=after)
    if lesson==18:
        a=np.array([[1.,0.],[0.,2.]],dtype='<f4');b=np.asfortranarray(a)
        semantic=lambda x:hashlib.sha256(np.ascontiguousarray(x,dtype='<f4').tobytes()).hexdigest()
        assert semantic(a)==semantic(b)
        return dict(c_layout=a.flags.c_contiguous,f_layout=b.flags.f_contiguous,semantic_digest_equal=True,
                    warning='A real semantic hash must also include shape, gene order, cell order and coordinates.')
    if lesson==19:
        measured_zero={'gene':'G','measured':True,'value':0};absent={'gene':'G','measured':False,'value':None}
        assert measured_zero!=absent
        return dict(measured_zero=measured_zero,absent_panel_gene=absent,zero_fill_cannot_preserve_measurement_status=True)
    if lesson==20:
        a=r.normal(size=(300,3));p=r.permutation(len(a));v=lambda x:np.mean(np.abs(x[:,0]-x[:,1])**.5)
        before=v(a);shuffled=a[p];after=v(shuffled)
        # Same gene-gene functional, but attaching these rows to fixed positions changes spatial neighbours.
        spatial=lambda x:np.mean(np.linalg.norm(x[1:]-x[:-1],axis=1))
        assert np.isclose(before,after)
        return dict(gene_pair_functional_before=float(before),gene_pair_functional_after=float(after),
                    sequence_neighbor_distance_before=float(spatial(a)),sequence_neighbor_distance_after=float(spatial(shuffled)),
                    lesson='Gene-gene structure and spatial structure answer different questions.')
    raise ValueError('Lesson must be 1..20')


def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--lesson',type=int);p.add_argument('--all',action='store_true');p.add_argument('--seed',type=int,default=7);p.add_argument('--out',type=Path);a=p.parse_args()
    if a.all==bool(a.lesson):p.error('Choose exactly one of --all or --lesson.')
    ids=range(1,21) if a.all else [a.lesson]
    result={f'{i:02d}':experiment(i,a.seed) for i in ids};text=json.dumps(result,indent=2,ensure_ascii=False,allow_nan=False)+'\n'
    if a.out:a.out.write_text(text)
    else:print(text,end='')


if __name__=='__main__':main()
