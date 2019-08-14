class Weather{
    constructor(){
        this.key = 'fce3175ea830498ba5d147d23ef53881';
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