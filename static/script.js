const $ = window.$
$(document).ready(() => {
  $('#searchBtn').click(() => {
    console.log('button search was clicked')
    const userInput = $('#search').val()
    $.get(`/word?sw=${userInput}`)
      .done((data) => {
        console.log('i have data:', data[0])
        let output = ''
        data.forEach(hit => {
          output = output + '<p>' + hit.searchWord + ' - ' + hit.translation + '</p>'
        })
        $('#searchResult').html(output)
      })
  })

  $('#addBtn').click(() => {
    console.log('button add was clicked')
    const wordInEng = $('#addEng').val()
    const wordInRus = $('#addRus').val()
    $('#addEng').val('')
    $('#addRus').val('')
    $.post(`/word?sw=${wordInEng}&lang=English&tran=${wordInRus}&tranLang=Russian`)
      .done((data) => {
        console.log(data)
        refreshList()
      })
  })

  function refreshList () {
    $.get('/words/')
    .done((data) => {
      $("#fullList").empty()
      data.forEach(pair => {
        const elem = $('<p>' + pair[0] + ' - ' + pair[1] + '<button class="deleteBtn">' + 'Delete' + '</button>' + '</p>')

        // hook up delete logic
        elem.find('.deleteBtn').click(() => {
          console.log('button delete was clicked')
          $.ajax({
            url:`/word?sw=${pair[0]}`,
            type: 'DELETE'
          }).done(() => refreshList())
        })

        $('#fullList').append(elem)
      })
    })
  }
  refreshList()

})
