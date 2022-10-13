
function choisirMois(){
    // alert("choisir le mois")
    const mois = document.getElementById("mois").value
    console.log(mois)
    let xhq = new XMLHttpRequest()
    // call back
    xhq.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText)
            // nettoyer le champ area visualisation
            let areaD3 = document.getElementById('areaVisualisation')
            while(areaD3.children.length > 0){
                areaD3.removeChild(areaD3.firstChild)
            }
            
            d3.select("#areaVisualisation")
                .data(this.responseText)
                .enter()
                .append("p")
                .text(this.responseText)
                .exit()
                .remove()
        }else{

        }


    }

    // let arg1 = "09" 
    let arg1 = mois 
    let url = 'http://localhost:3000/temperatures/' + arg1
    xhq.open('GET', url, true)

    xhq.send()
}