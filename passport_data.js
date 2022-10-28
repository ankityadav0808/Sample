
$(document).ready( function () {
  $('#myTable').DataTable();
} );
var alldata = JSON.parse(localStorage.getItem("passport_data"));
alldata.forEach(element => {
// console.log(element);
    let { first_name, DOB, surname, Email, office_name, register_at } = element;

    $('#data').append(`
    <tr>
                <td>${first_name+" "+surname}</td>
                <td>${DOB}</td>
                <td>${Email}</td>
                <td>${office_name}</td>
                <td>${register_at}</td>
              </tr>
    
    `)
});