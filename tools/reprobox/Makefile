.PHONY: build smoke lab test

build:
	docker build -t vec-reprobox:local .

smoke: build
	docker run --rm vec-reprobox:local python scripts/smoke_test.py

lab:
	docker compose up --build

test:
	python -m pytest -q tests
