var options = {
  chart: {
    height: 350,
    type: "line",
    stacked: false
  },
  dataLabels: {
    enabled: false
  },
  colors: ["#FF1654", "#247BA0"],
  series: [
    {
      name: "Sinus",
      data: []
    },
    {
      name: "Cosinus",
      data: []
    }
  ],
  stroke: {
    curve: "smooth"
  },
  plotOptions: {
    bar: {
      columnWidth: "20%"
    }
  },
  yaxis: [
    {
      tickAmount: 5,
      labels: {
        formatter: function(val) {
          return val.toFixed(1);
        }
      },
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
      },
    },
  ],
  tooltip: {
    shared: false,
    intersect: true,
    x: {
      show: false
    }
  },
  xaxis: {
    tickAmount: 10
  },
  legend: {
    horizontalAlign: "right",
    offsetX: 40
  }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();

const sin=[];
const cos=[];
const sseHandler = (event) =>{
  var i = document.querySelector('#cislo').value;
  var Sinus =document.getElementById('flexCheckChecked_sin').checked;
  var Cosinus =document.getElementById('flexCheckChecked_cos').checked
  const data = JSON.parse(event.data);
  sin.push(data.y1*i);
  cos.push(data.y2*i);
  chart.updateSeries([{
    name:"Sinus",
    data: sin
  },{
    name:"Cosinus",
    data: cos,
  }])
  if(Sinus && Cosinus){
    chart.showSeries('Cosinus')
    chart.showSeries('Sinus')
  }
  else if(Sinus){
    chart.hideSeries('Cosinus')
    chart.showSeries('Sinus')
  }
  else if(Cosinus){
    chart.showSeries('Cosinus')
    chart.hideSeries('Sinus')
  }
  else{
    chart.hideSeries('Cosinus')
    chart.hideSeries('Sinus')
  }
}

function CheckMax(object)
{
  if (object.value > 5 || object.value < 1)
    object.value = 1;
}

const
  range = document.getElementById('range'),
  rangeV = document.getElementById('rangeV'),
  setValue = ()=>{
    const
      newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
      newPosition = 10 - (newValue * 0.2);
    rangeV.innerHTML = `<span>${range.value}</span>`;
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);


function Show(){
  var inputVal=document.getElementById('flexCheckChecked_in').checked;
  var input=document.getElementById('cislo');
  var sliderVal=document.getElementById('flexCheckChecked_sli').checked;
  var slider=document.getElementById('slider');
  if(inputVal){
    input.style.visibility="visible";
  }else{
    input.style.visibility="hidden";
  }
  if(sliderVal){
    slider.style.visibility="visible";
  }else
  {    
    slider.style.visibility="hidden";
  }
}

const evtSource = new EventSource("https://iolab.sk/evaluation/sse/sse.php")
evtSource.addEventListener("message", sseHandler)

const stop = () => {
  evtSource.removeEventListener("message", sseHandler);
}
document.querySelector("#koniec").addEventListener("click", stop);

const ChangeNumber=()=>{
  document.getElementById("cislo").value= document.getElementById("range").value;
}
const ChangeSlider=()=>{
  document.getElementById("range").value= document.getElementById("cislo").value;
  const
      newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
      newPosition = 10 - (newValue * 0.2);
    rangeV.innerHTML = `<span>${range.value}</span>`;
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
}