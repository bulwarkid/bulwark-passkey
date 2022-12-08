package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

var faviconCache = make(map[string]string)

func importFaviconCache(data []byte) {
	cache := make(map[string]string)
	err := json.Unmarshal(data, &cache)
	if err != nil {
		debugf("Could not load favicon cache: %s", err)
		return
	}
	faviconCache = cache
}

func exportFaviconCache() ([]byte, error) {
	return json.Marshal(faviconCache)
}

func getFavicon(domain string) (string, error) {
	if val, ok := faviconCache[domain]; ok {
		return val, nil
	}
	response, err := http.Get(
		"https://s2.googleusercontent.com/s2/favicons?domain=" + domain)
	if err != nil {
		return "", err
	}
	if response.StatusCode != 200 {
		return "", fmt.Errorf("Could not find favicon: Response %d", response.StatusCode)
	}
	data, err := io.ReadAll(response.Body)
	if err != nil {
		return "", err
	}
	dataUrl := "data:image/vnd.microsoft.icon;base64," + base64.StdEncoding.EncodeToString(data)
	faviconCache[domain] = dataUrl
	return dataUrl, nil
}
