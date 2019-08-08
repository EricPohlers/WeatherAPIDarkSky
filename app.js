window.addEventListener('load', () =>{
    const weather = new Weather;
    
    const ui = new UI;

    ui.loadUI(weather.getData());

  });






