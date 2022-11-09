all: build

build: tailwind
	hugo

run: tailwind
	hugo serve

tailwind:
	npx tailwindcss -i ./src/input.css -o ./static/css/main.css