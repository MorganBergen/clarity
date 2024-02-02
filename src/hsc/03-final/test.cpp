/**
 * @author      MORGAN MAHA BERGEN
 * @date        Tue Jan 23 20:59:26 CST 2024
 * @file        test.cpp
 * @brief       a way for each websocket stream to be managed by console output using cpp
 *              integrating cpp into js or ts or python higher level code regarding fungible token HSC
 *              the front end design will simply contain data that can be viewed in the browser
 *
 *              curl_easy_perform() RETURN VALUE AFTER INVOCATION
 *
 *
 * "ftp://ftp.example.com/file[1-100].txt"
 * "ftp://ftp.example.com/file[001-100].txt"    
 * "ftp://ftp.example.com/file[a-z].txt"
 **/

#include <iostream>
#include <curl/curl.h>

// Write callback function declaration
size_t writecb(void* ptr, size_t size, size_t nmemb, void* userdata);

int main() {

    CURL *curl;
    CURLcode res;
    curl = curl_easy_init();

    if(curl) {
        
        curl_easy_setopt(curl, CURLOPT_URL, "");
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writecb);
        
        // pass the easy handle to the callback
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, curl);
    
        // perform the request, res will get the return code
        res = curl_easy_perform(curl);

	for (int i = 0; i < 10; i++) {
		std::cout << res << std::endl;
	}

        // check for errors
        if (res != CURLE_OK) {
            std::cout << stderr << "curl_easy_perform() failed\n" << curl_easy_strerror(res);
        }

        // always cleanup
        curl_easy_cleanup(curl);
    }

    return 0;
}

// implement the write callback function
size_t writecb(void* ptr, size_t size, size_t nmemb, void* CLIENTdata) {

    return size * nmemb;
}

