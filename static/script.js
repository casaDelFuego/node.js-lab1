$(document).ready(() => {
  $('#searchBtn').click(() => {
    console.log('button search was clicked')
    const userInput = $("#search").val()
    $.get(`/word?sw=${userInput}`)
      .done((data)=>{
        console.log('i have data:', data[0])
        let output = ''
        data.forEach(hit =>{
            output = output + '<p>' + hit.searchWord + ' - ' + hit.translation + '</p>'
        })
        $('#searchResult').html(output)
      })
  })
})
