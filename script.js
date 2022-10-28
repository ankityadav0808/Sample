$(function () {
    $("#dob").datepicker({ dateFormat: 'dd/mm/yy' });
});

localStorage.clear();   

const date_obj = new Date().toLocaleDateString().toString().split("/");
new_curent_date=date_obj[2]+date_obj[1]+date_obj[0];

$(function () {
    
   

    $('form').validate({
        rules: {
            'passport_office_option': {
                required: {
                    function(element) {
                        return $("#passport_office_option").val() == "";
                    }
                    
                }
            },
            given_name: {
                required: true,
                minlength: 2,
                maxlength: 20,
                pattern:'^[a-z\\sA-Z_]*$',
            },
            surname: {
                minlength: 2,
                maxlength: 20,
                pattern:'^[a-z\\sA-Z_]*$',
            },
            dob: {
                required: true,
                checkDate: true,

            },
            email_id: {
                required: true,
                email: true,
                maxlength: 35,

            },
            login_id: {
                required: true,
            },
            pswd: {
                required: true,
                strongPswd:true,
                
            },
            cnf_pswd: {
                required: true,
                equalTo:'#pswd'
            }



        },  
        messages: {
            passport_office_option: {
                required: "Please Select Proper Office",
            },
            given_name: {
                required:"Please Enter your Name",
                minlength: "Minimum 2 character is required",
                maxlength: "Maximum 20 character is allowed ",
                pattern:"Only Alphabates Allowed"
            },
            surname: {
                minlength: "Minimum 2 character is required",
                maxlength: "Maximum 20 character is allowed ",
                pattern:"Only Alphabates Allowed"
            },
            dob:{
                required:"Please Enter Your Date Of Birth",
                checkDate:"The Selected date must be less than today date"
            },
            email_id: {
                required: "Please Enter Your Email Id",
                maxlength: "Maximum 35 character is allowed ",

            },
            login_id: {
                required: "Please Enter Login Id",
            },
            pswd: {
                required: "Enter New Password minmum 8 Character",
                strongPswd:"Use Strong Pswd eg. Ankit@1122",
            },
            cnf_pswd: {
                required: "Enter Confirm password",
                equalTo:'Enter password is same as above entered pswd'
            }


        },
        submitHandler: function (form) {
            const allData = localStorage.getItem("passport_data") ? JSON.parse(localStorage.getItem("passport_data")) : []
            obj={
                register_at:$('[name="select_apply_at"]:checked').val(),
                office_name:$('#passport_office_option').val(),
                first_name:$('#given_name').val(),
                surname:$('#surname').val(),
                DOB:$('#dob').val(),
                Email:$('#email_id').val(),
                login_option:$('[name="login_option"]:checked').val(),
                login_id:$('#login_id').val(),
                password:$('#pswd').val(),
                cnf_password:$('#cnf_pswd').val()
            }
            allData.push(obj);
            localStorage.setItem('passport_data',JSON.stringify(allData));
            sessionStorage.setItem('passport_data',JSON.stringify(allData));
            form.submit();

        }
    })


    $.validator.addMethod('checkDate', function (value,element) {
        let entered_dob=$('#dob').val().split('/');
        let new_entered_dob= entered_dob[2]+entered_dob[1]+entered_dob[0];
        return new_entered_dob < new_curent_date;
    }, "Please Select Past Date")

    $.validator.addMethod('strongPswd',function(element){
                return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(element)
            },'Use strong password')

    $(document).on('click' ,function(){

        if($('[name="login_option"]:checked').val()=="Yes"){
            $('#login_id').attr('disabled','true')
        }else{
            $('#login_id').removeAttr('disabled')
        }
      
    })

    $('#yes_op').on('click',function(){
        $('#login_id').val($('#email_id').val())
    })

    function checkDate(value) {
        let entered_dob=value.val().split('/');
        let new_entered_dob= entered_dob[2]+entered_dob[1]+entered_dob[0];
        return new_entered_dob< new_curent_date;
    }

    $('#dob').on('change',function(){
        if(checkDate($(this))){
            $('#dob-error').hide();
        }else{
            $('#dob-error').html('The Selected date must be less than today date')
            $('#dob-error').show();
        }
    })

    $('#email_id').on('change',function(){
        if($('[name="login_option"]:checked').val()=="Yes"){
            $('#login_id').val( $(this).val());
        }else{
            $('#login_id').val( '');
        }
    })

    $($('[name="login_option"]:checked')).click(function(){
        $('#login_id').val( '');
        $('#login_id-error').hide();
    })
    $($('[name="login_option"]')).click(function(){
        if($('[name="login_option"]:checked').val()=="Yes"){
            $('#login_id-error').hide();
        }else{
            $('#login_id-error').show();

        }
    })


    $('#cancel').on('click',function(){
        document.location.reload();
   
    })

    

})
