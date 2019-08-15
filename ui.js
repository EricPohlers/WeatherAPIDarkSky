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
        this.showAlert('Loading Data from API ...', 'process');
        data.then((data) => {            
            this.showAlert('Loading successfull', 'success', 3000);
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
                            <h2 class="header">${weekday[new Date(time*1000).getDay()]}</h2>
                            <canvas class="sub-icon" id="icon-${index+1}"></canvas>
                            <div class="content">
                                <ul>
                                <li>${summary}</li>
                                <br>
                                <li>${Math.floor((temperatureMin - 32) * (5 / 9))} - ${Math.floor((temperatureMax - 32) * (5 / 9))} °C</li>
                                </ul>
                            </div>
                    `;
                    this.setIcons(icon, document.querySelector(`#icon-${index+1}`));
                });
            }).catch(err => {
                this.showAlert(err.message, 'error');
            });
        };
    
    setIcons(icon, iconID){
                const skycons = new Skycons({color : "white"});
                const currentIcon = icon.replace(/-/g, "_").toUpperCase();
                skycons.play();
                return skycons.set(iconID, Skycons[currentIcon]);
            }

    //show alert (message, className, timeoutDuration)
    showAlert(message, className, timeoutDuration){
        this.hideAlert();
        
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const main = document.querySelector('main');
    //get form
    const current = document.querySelector('.current');
    //insert alert
    main.insertBefore(div,current);
    if(timeoutDuration > 0){
        setTimeout(this.hideAlert, timeoutDuration); 
    }
    }  
    hideAlert(){
        if(document.querySelector('.alert') != null)
        document.querySelector('.alert').remove(); 
    }
}
