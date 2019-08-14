class UI{
    constructor(){
        //UI elements
    this.temperatureDescription = document.querySelector('.temperature-description');
    this.temperatureDegree = document.querySelector('.temperature-degree');
    this.locationTimezone = document.querySelector('.location-timezone');
    this.temperatureSection = document.querySelector('.temperature-section');
    this.temperatureSpan = document.querySelector('.temperature-section span');

    //next days
    this.nextDays = document.querySelectorAll('.day-card');
    }

    loadUI(data){
        data.then((data) => {
            console.log(data);
            
            
            //Main part
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
                    if(this.temperatureSpan.textContent === '°F'){
                        this.temperatureSpan.textContent = '°C';
                        this.temperatureDegree.textContent = celsius;
                        
                    }else{
                        this.temperatureSpan.textContent = '°F';
                        this.temperatureDegree.textContent = temperature;
                    }
                });

                //fill cards for next days
                //weekday array
                const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday", "Friday", "Saturday"];
                 
                this.nextDays.forEach((day, index)=>{

                    let {temperatureMin,temperatureMax, summary, icon, time} = data.daily.data[index+1];
                    day.innerHTML = `
                     <div class="front">
                            <h2 class="header">${weekday[new Date(time*1000).getDay()]}</h2>
                            <canvas class="sub-icon" id="icon-${index+1}"></canvas>
                            <div class="content">
                                <ul>
                                <li>${summary}</li>
                                <br>
                                <li>${Math.floor((temperatureMin - 32) * (5 / 9))} - ${Math.floor((temperatureMax - 32) * (5 / 9))} °C</li>
                                </ul>
                            </div>
                     </div>
                     <div class="back">
                      <p>Text sollte lesbar sein</p>
                     </div>
                    `;
                    this.setIcons(icon, document.querySelector(`#icon-${index+1}`));
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
