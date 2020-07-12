
const weatherForm = document.querySelector('form')
// const search = document.querySelector('input')
const search= document.getElementById('data1')
const search1=document.getElementById('data2')
const search2=document.getElementById('data3')
const search3=document.getElementById('data4')


const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const name=search1.value
    const email=search2.value
    const pass=search3.value
    console.log(pass)

    messageTwo.textContent = '..'

    fetch('/database?address=' + location + '&data=' + name + '&email=' + email + '&password='+ pass).then((response) => {
        response.json().then((data) => { 
            console.log('connected')

            console.log(data)
            if (data.error) {
                messageOne.textContent = data.error
            }
           else if(data.documents.length===0){
                messageTwo.textContent='please provide other age'
                document.getElementById('data').value = ''
                
            }
             else {
                
                console.log(data)
                console.log("========================",typeof data.document,data.documents)
                var list = Array.from(data.documents)
                content = '<table><thead><th>NAME</th><th>AGE</th></thead>'
                for (var i of list){
                    content += '<tr><td style="width:100px;height:20px;text-align:center;">'+i.name+'</td>'+'<td style="width:100px;height:20px;text-align:center;">'+i.age+'</td></tr>'
                }
                content +="</table>"
                messageOne.innerHTML=content
                document.getElementById('data').value = ''
                
            }
        
        })
    })
})