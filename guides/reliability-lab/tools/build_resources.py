"""Build complete, localized lesson resources and a transparent filing ledger."""
import hashlib,html,json,re,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from experiments import experiment


def build():
    source=json.loads((ROOT/'lessons/source.json').read_text())
    translations={p.stem:json.loads(p.read_text()) for p in (ROOT/'translations').glob('*.json')}
    for language,tr in translations.items():
        if tr.get('compact_topics'):
            tr['topics']=[dict(id=i+1,title=v[0],concept=v[1],question=v[2],answer=v[3],
                              limit=tr['scope'],variation=v[4]) for i,v in enumerate(tr.pop('compact_topics'))]
    translations['en']={'name':'English','heading':'Worked reliability exercise','intro':'This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.','run':'Run the exercise','workflow':'Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.','exercise':'Your exercise','answer':'Interpret the result','limit':'Limits','variation':'Try another case','result':'Reference output: seed 7','translation':'English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.','topics':source}
    records=[]
    for lang,tr in sorted(translations.items()):
        assert len(tr['topics'])==20,lang
        topics={x['id']:x for x in tr['topics']}
        for canonical in source:
            topic=topics[canonical['id']]
            assert all(topic.get(k) for k in ['title','concept','question','answer','limit','variation']),(lang,canonical['id'])
            directory=ROOT/'resources'/lang;directory.mkdir(exist_ok=True,parents=True)
            path=directory/(f"{canonical['id']:02d}-"+canonical['slug']+'.md')
            expected=experiment(canonical['id'],7)
            result=json.dumps(expected,ensure_ascii=False,indent=2)
            cmd=f"python3 tools/experiments.py --lesson {canonical['id']:02d} --seed 7"
            text=f"# {topic['title']}\n\n**{tr['name']} · Reliability Lab {canonical['id']:02d} · {tr['heading']}**\n\n{tr['intro']}\n\n{topic['concept']}\n\n## {tr['run']}\n\n{tr['workflow']}\n\n```sh\ngit clone https://github.com/random-guy-05/vec-reliability-lab.git\ncd vec-reliability-lab\npython3 -m venv .venv\n# macOS/Linux; Windows: .venv\\Scripts\\activate\n. .venv/bin/activate\npython3 -m pip install -r requirements.txt\n{cmd}\n```\n\n## {tr['exercise']}\n\n{topic['question']}\n\n## {tr['result']}\n\n```json\n{result}\n```\n\n## {tr['answer']}\n\n{topic['answer']}\n\n## {tr['variation']}\n\n{topic['variation']}\n\n## {tr['limit']}\n\n{topic['limit']}\n\n{tr['translation']}\n\n[Source code](../../tools/experiments.py) · [Canonical English](../en/{canonical['id']:02d}-{canonical['slug']}.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)\n"
            path.write_text(text,encoding='utf-8')
            relative=str(path.relative_to(ROOT));url='https://github.com/random-guy-05/vec-reliability-lab/blob/main/'+relative
            records.append(dict(id=f"{canonical['id']:02d}-{lang}",topic=canonical['id'],language=lang,language_name=tr['name'],title=topic['title'],path=relative,url=url,command=cmd,sha256=hashlib.sha256(text.encode()).hexdigest(),status='local-tested',kind='teach' if lang=='en' else 'expand',shared_code=True,native_speaker_review=False if lang!='en' else None,
              application_title=f"Reliability Lab {canonical['id']:02d} — {canonical['title']} ({tr['name']})",
              application_description=f"A worked lesson in {tr['name']} on {canonical['title'].lower()}, using an executable synthetic experiment and a saved reference result. {canonical['concept']} It includes a runnable command, interpretation, an extension exercise and explicit limitations. This is edition {lang} of lesson {canonical['id']:02d} in a 20-topic, 15-language collection. Editions share the same code; translated editions are machine-assisted and have not received native-speaker review. It uses no challenge target data and makes no claim of official endorsement, reach, award eligibility or score improvement. Related educational resources already exist; the intended extension is this specific failure mechanism and its localized worked exercise.",
              application_run=f"Clone the public repository; use Python 3.10+ and install requirements.txt in a virtual environment. From the repository root run: {cmd}. Compare with the reference JSON embedded in this edition. Run python3 -m unittest discover -s tests -v for the repository checks. All data are synthetic. No challenge account or downloaded dataset is needed."))
    (ROOT/'catalog.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
    lines=['# VEC Reliability Lab','','Twenty synthetic, runnable reliability lessons in '+str(len(translations))+' language editions. **'+str(len(records))+' reading resources share twenty experiments. They are not '+str(len(records))+' independent software implementations, and award acceptance is not assured.**','','Independent community teaching material. No official affiliation or endorsement. All experiments use invented data; none computes a hidden score or uses challenge datasets.','','## Start','','Python 3.10+ and NumPy are required. Clone this repository, create a virtual environment and install `requirements.txt`. Run `python3 tools/experiments.py --lesson 01 --seed 7`. Full setup instructions, a worked reference output and an interpretation appear in each edition.','','## Editions','']
    for lang,tr in sorted(translations.items()):
        lines+=['### '+tr['name'],'']
        lines += [f"- [{r['topic']:02d}. {r['title']}]({r['path']})" for r in records if r['language']==lang]
        lines+=['']
    lines+=['## Translation status','','Translations are machine-assisted first editions. Their scientific examples are tested, but that does not establish linguistic correctness. No native-speaker review is claimed. Corrections are welcome through issues or pull requests. English is the canonical factual source; literal commands, JSON identifiers and mathematical values stay unchanged.','','## Reproduce and inspect','','```sh','python3 tools/experiments.py --all --out examples/your_results.json','python3 -m unittest discover -s tests -v','```','','The catalog records the topic, edition, shared-code relationship and content digest for every resource. Seed 7 outputs are saved in `examples/expected_seed7.json`. Numeric random results may differ across NumPy releases; mathematical assertions are the primary checks. See `SOURCES.md` for related work, scope, and primary documentation. MIT licensed. No audience size, acceptance or award amount is claimed.','']
    (ROOT/'README.md').write_text('\n'.join(lines))
    print(f'Built {len(records)} resources across {len(translations)} languages.')


if __name__=='__main__':build()
