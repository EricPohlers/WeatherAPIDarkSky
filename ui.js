class UI{
    constructor(){
        //UI elements
    this.temperatureDescription = document.querySelector('.temperature-description');
    this.temperatureDegree = document.querySelector('.temperature-degree');
    this.locationTimezone = document.querySelector('.location-timezone');
    this.temperatureSection = document.querySelector('.temperature-section');
    this.temperatureSpan = document.querySelector('.temperature-section span');
    }

    loadUI(data){
        data.then((data) => {
            console.log(data);
            let {temperature, summary, icon} = data.currently;
            temperature = Math.floor(temperature);
                //Formular for celsius
            const celsius = Math.floor((temperature - 32) * (5 / 9));
            //set dom elements from api
            this.temperatureDegree.textContent = celsius;
            this.temperatureDescription.textContent = summary;
            this.locationTimezone.textContent = data.timezone;

                //setIcon
                this.setIcons(icon, document.querySelector('.icon'));

                //change Temperature to Celsius / Fahrenheit
                this.temperatureSection.addEventListener('click', () => {
                    if(this.temperatureSpan.textContent === 'F'){
                        this.temperatureSpan.textContent = 'C';
                        this.temperatureDegree.textContent = celsius;
                        
                    }else{
                        this.temperatureSpan.textContent = 'F';
                        this.temperatureDegree.textContent = temperature;
                    }
                });
            });

        };
    
    setIcons(icon, iconID){
                const skycons = new Skycons({color : "white"});
                const currentIcon = icon.replace(/-/g, "_").toUpperCase();
                skycons.play();
                return skycons.set(iconID, Skycons[currentIcon]);
            }
}