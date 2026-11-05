import importlib.util
import json
from pathlib import Path
import sys
import unittest
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from experiments import experiment,norm,recover,ranks,rho


class MechanismTests(unittest.TestCase):
    def test_declared_mechanisms_across_seeds(self):
        for seed in (0,1,7,42,2026):
            for lesson in range(1,21):
                with self.subTest(seed=seed,lesson=lesson):
                    out=experiment(lesson,seed)
                    json.dumps(out,allow_nan=False)

    def test_count_normalization_nonidentifiability(self):
        np.testing.assert_allclose(norm(np.array([[1.,2.,4.]])),norm(np.array([[9.,18.,36.]])))

    def test_missing_single_molecule_is_not_exact_recovery(self):
        x=np.array([[3.,6.,12.]])
        self.assertFalse(np.array_equal(recover(norm(x)),x))

    def test_rank_ties_use_average(self):
        np.testing.assert_allclose(ranks([3,1,1,2]),[3,.5,.5,2])

    def test_rank_invariance_to_monotone_transform(self):
        self.assertAlmostEqual(rho([1,2,2,4],[1,4,4,16]),1)

    def test_constant_rank_has_no_correlation(self):
        self.assertIsNone(rho([2,2,2],[1,2,3]))

    def test_diagonal_correction_can_make_estimate_negative(self):
        out=experiment(7)
        self.assertLess(out['unbiased_mmd_squared'],0)
        self.assertGreaterEqual(out['biased_mmd_squared'],0)

    def test_positive_type_effects_can_have_negative_aggregate(self):
        out=experiment(17)
        self.assertTrue(all(b>a for a,b in zip(out['type_means_before'],out['type_means_after'])))
        self.assertLess(out['aggregate_after'],out['aggregate_before'])

    def test_invalid_lesson_fails(self):
        with self.assertRaises(ValueError):experiment(0)

    def test_seed7_reference_reproduces_with_numeric_tolerance(self):
        reference=json.loads((ROOT/'examples/expected_seed7.json').read_text())
        def compare(a,b):
            if isinstance(a,dict):
                self.assertEqual(set(a),set(b))
                for k in a:compare(a[k],b[k])
            elif isinstance(a,list):
                self.assertEqual(len(a),len(b))
                for x,y in zip(a,b):compare(x,y)
            elif isinstance(a,float):self.assertAlmostEqual(a,b,places=8)
            else:self.assertEqual(a,b)
        for i in range(1,21):
            compare(experiment(i),reference[f'{i:02d}'])


class ResourceTests(unittest.TestCase):
    def test_catalog_pages_have_actual_content_and_working_local_links(self):
        catalog=json.loads((ROOT/'catalog.json').read_text())
        self.assertEqual(len(catalog),len({r['id'] for r in catalog}))
        import re
        for record in catalog:
            path=ROOT/record['path'];text=path.read_text()
            # Character counts penalize non-Latin scripts; check UTF-8 content plus structure.
            self.assertGreater(len(text.encode('utf-8')),1200,record['id'])
            self.assertIn('```json',text)
            self.assertIn(record['command'],text)
            for target in re.findall(r'\]\(([^)]+)\)',text):
                if target.startswith(('http:','https:','#')):continue
                self.assertTrue((path.parent/target).resolve().exists(),(record['id'],target))

    def test_every_edition_covers_all_twenty_topics(self):
        catalog=json.loads((ROOT/'catalog.json').read_text())
        for language in {r['language'] for r in catalog}:
            self.assertEqual({r['topic'] for r in catalog if r['language']==language},set(range(1,21)))


if __name__=='__main__':unittest.main()
