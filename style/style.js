const loadData = async(searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    try{
        const res = await fetch(url)
        const datas = await res.json()
        DisplayData(datas.data,dataLimit) 
    }
    catch(error)
    {
        console.log(error)
    }
}

function print(info,dataLimit)
{
    const card = document.getElementById("phone-container")
    const showAll = document.getElementById("all_btn")
    if( dataLimit && info.length > 10)
    {
        info = info.slice(0,10)
        showAll.classList.remove('d-none')
    }
    else
    {
        showAll.classList.add('d-none')
    }

    if(info.length === 0)
    {
        document.getElementById("warning_text").classList.remove('d-none')
    }
    else
    {
        document.getElementById("warning_text").classList.add('d-none')
    }

    try{
        card.innerHTML = ''
        info.forEach(temp => {
            const divs = document.createElement('div')
            divs.classList.add('col')
            divs.innerHTML = `
            <div class="card">
            <img class="img-fluid" src="${temp.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${temp.phone_name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <button onclick="show_btn('${temp.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">
                Show Details
            </button>
            </div>
            
          </div>
            `
            card.appendChild(divs)
        })
       }
       catch(error)
       {
        console.log(error)
       }
}
const DisplayData = async(info,dataLimit) => {
    const card = document.getElementById("phone-container")
    const showAll = document.getElementById("all_btn")
    print(info,dataLimit)
    toggelSpinner(false)
}

const search_input = async() =>{
    const input_text = document.getElementById('search_text').value
    toggelSpinner(true)
    try{
        loadData(input_text,10)
    }
    catch(error)
    {
        console.log(error)
    }
}

const all_show = () =>{
    const text = document.getElementById('search_text').value
    console.log(text)
    loadData(text)
}

const show_btn = async(details) =>{
     const url = `https://openapi.programming-hero.com/api/phone/${details}`
     const modal_box = document.getElementById("detailsBody")
     const modal_title = document.getElementById("detailsModalLabel")
    try
    {
        const res = await fetch(url)
        const datas = await res.json()
        console.log(datas.data.name)
        modal_title.innerText = datas.data.name
        modal_box.innerHTML = `
            <p>Release Date: ${datas.data.releaseDate}</p>
            <p>Storage: ${datas.data.mainFeatures.storage}</p>
            <p>Others: ${datas.data.others.Bluetooth}</p>
            <p>Sensor: ${datas.data.mainFeatures.sensors[0]}</p>
        `
    }
    catch(error)
    {
        console.log(error)
    }

}

const toggelSpinner = isloading => {
    const spinner = document.getElementById("loader")
    if(isloading)
    {
        document.getElementById('loader').classList.remove('d-none')
    }
    else
    {
        document.getElementById('loader').classList.add('d-none')
    }
}

loadData()