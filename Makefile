
run: output
	./output/Bulwark\ Passkey.app/Contents/MacOS/Bulwark\ Passkey

build: clean output

frontend/build:
	cd frontend && npm run build

output: frontend/build
	rm -r app/frontend_dist || true
	cp -r frontend/build app/frontend_dist
	cd app && wails build -s -skipbindings
	mkdir output || true
	rm -r output/Bulwark\ Passkey.app || true
	mv app/build/bin/Bulwark\ Passkey.app output

clean:
	rm -r output || true
	rm -r frontend/build || true
	rm -r app/build/bin || true