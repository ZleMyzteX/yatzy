.PHONY: help dev dev-down build clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Start local dev server
	npm run dev

dev-down: ## No-op (vite dev stops with Ctrl-C)
	@echo "salty-yatzy runs as a local process — stop it with Ctrl-C"

build: ## Build static site
	npm run build

clean: ## Remove build output
	rm -rf build .svelte-kit
