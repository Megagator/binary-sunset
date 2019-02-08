class Api {
	static insertApiKey(url) {
		return url.replace('<<api_key>>', this.apiKey);
	}
	
	static makeRequestUrl(id) {
		const url = this.apiUrl.replace('{movie_id}', id)
		// console.log("made api request: ", url);
		return this.insertApiKey(url);
	}

	static makeImageUrl(resource, size) {
		const url =  this.imageUrl + size + resource;
		// console.log("made image url: ", url);
		return url;
  }
  
  static get(url) {
    // return new pending promise
    return new Promise((resolve, reject) => {
      // select http or https module, depending on reqested url
      const lib = url.startsWith('https') ? require('https') : require('http');
      const request = lib.get(url, (response) => {
        // handle http errors
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error('Failed to load page, status code: ' + response.statusCode));
        }
        
        // temporary data holder
        const body = [];
        
        // on every content chunk, push it to the data array
        response.on('data', (chunk) => body.push(chunk));
    
        // we are done, resolve promise with those joined chunks
        response.on('end', () => {
          resolve(body.join(''));
          // console.log("got from api: ", JSON.parse(body));
        });
      });
      
      // handle connection errors of the request
      request.on('error', (err) => reject(err))
    })
  };
}

Api.apiUrl = 'https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US';
Api.imageUrl = 'https://image.tmdb.org/t/p';

Api.apiKey = '8f4c4dd42de458622fa134ae444cc578';

export default Api;