class Weather{
    constructor(){
        this.key = '11d98e30e90262892ccd580406d16ed8';
        //proxy because darksky wont work with localhost
        this.proxy = 'https://cors-anywhere.herokuapp.com/';
    }


    async getData(){ 
        console.log('fetching API...');
        // try {
            const loc = await this.getGeoLocation();
            const apiResponse = await fetch(`${this.proxy}https://api.darksky.net/forecast/${this.key}/${loc.coords.latitude},${loc.coords.longitude}`);
            
            const data = await apiResponse.json();
            return data;    
        // } catch (error) {
        //     return { error : 'Unable to comunicate with Server'}
        // }
           
            
    }

    getGeoLocation(){
        
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });         
    }
}