class Weather{
    constructor(){
        this.key = 'f77beb52d4ee74db60979920d88172ac';
        //proxy because darksky wont work with localhost
        this.proxy = 'https://cors-anywhere.herokuapp.com/';
    }


    async getData(){ 
        
        const loc = await this.getGeoLocation();
        
            const apiResponse = await fetch(`${this.proxy}https://api.darksky.net/forecast/${this.key}/${loc.coords.latitude},${loc.coords.longitude}`);
            
            const data = await apiResponse.json();
            return data;   
            
    }

    getGeoLocation(){

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });         
    }
}