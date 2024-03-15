


deamon:
	go install golang.org/x/mobile/cmd/gomobile@latest
	gomobile init
	go get golang.org/x/mobile/bind
	gomobile bind -v -androidapi 21 -target android -o ./android/app/libs/deamon.aar ./deamon
.PHONY:deamon