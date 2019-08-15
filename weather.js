class Weather{
    constructor(){
        //removed own API-Key
        this.key = '-';
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
