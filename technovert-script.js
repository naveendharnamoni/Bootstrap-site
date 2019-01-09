
$(document).ready(function () {
    $('#togglebars').click(toggleSideNav);
    $('#edit-job-title').click(enableJobTitleOptions);
    $('#edit-attendance-number').click(enableAttendanceNumber);
    $('#edit-employee-number').click(enableEmployeeNumber);
    $('#edit-leave-plan').click(enableLeavePlan);
    $('#edit-professional-summary').click(enableProfessionalSummary);
    $('#edit-experience').click(enableExperience);

    //activity bar
    //step-1 progress
    $("#step-1 input").keyup(personalDetailsProgress);
    $("#step-1 select").change(personalDetailsProgress);
    $('#dob').change(personalDetailsProgress);
    //step-2 progress
    $('#step-2 input').keyup(jobInfoProgress);
    $("#step-2 select").change(jobInfoProgress);
    $('#dateofjoining').change(jobInfoProgress);
    //step-3
    $('#step-3 textarea').keyup(summaryProgress);
    //accordion
    intializeAccordion();

    //date input
    intializeDatePicker();

    //step form
    intializeStepForm();
});

function personalDetailsProgress(){
    var numValid = 0;
    if(optionSelected('#gender'))
        numValid++;
    if(optionSelected('#martialstatus')){
        numValid++;
    }
    if(optionSelected('#bloodgroup')){
        numValid++;
    }
    $('#display-name').val($('#first-name').val()+" "+$('#last-name').val());
    var step1InputFields =  $("#step-1 input[required], #step-1 select[required]").length;
    numValid +=  $("#step-1 input[required]:not(:invalid)").length;
    var percent = (((numValid)/step1InputFields)*100)+"%"; 
    $("#personal-details-progress-bar,#personal-details-progress-bar-form").addClass("active");
    $("#personal-details-progress-bar,#personal-details-progress-bar-form").css("width", percent);
    $("#personal-details-progress-bar").text(parseFloat(percent).toFixed(2)+"%");
}

function jobInfoProgress(){
    var numValid = 0;
    
    var doj = $('#dateofjoining').val();
    var date = new Date(doj);
    if( doj != ""){
        $('#probationend').val(date.addDays(30).toISOString().substring(0, 10));
    }
    if(optionSelected('#jobtitle')){
        numValid++;
    }
    if(optionSelected('#leaveplan')){
        numValid++;
    }
    if(optionSelected("#location")){
        numValid++;
    }
    if(optionSelected('#department')){
        numValid++;
    }
    var step2InputFields =  $("#step-2 input[required],#step-2 select[required]").length;
    numValid +=  $("#step-2 input[required]:not(:invalid)").length;
    var percent = ((numValid/step2InputFields)*100)+"%"; 
    $("#job-info-progress-bar,#job-info-progress-bar-form").addClass("active");
    $("#job-info-progress-bar,#job-info-progress-bar-form").css("width", percent);
    $("#job-info-progress-bar").text(parseFloat(percent).toFixed(2)+"%");
}

Date.prototype.addDays = function(days) {
    var result = new Date(this.valueOf());
    result.setDate(result.getDate() + days);
    return result;
}

function summaryProgress(){
   var professionalSummary =  $('#professional-summary').val(),
   experience = $('#experience').val(),
   numValid = 0;

   if(professionalSummary != null && professionalSummary != ""){
        numValid++;
   }
    if(experience != null && experience != ""){
        numValid++;
    }
    var percent = ((numValid/2)*100)+"%"; 
    $("#summary-progress-bar").addClass("active");
    $("#summary-progress-bar").css("width", percent);
    $("#summary-progress-bar").text(percent);
}

function optionSelected(selector){
    if($(selector).find(':selected').val() != ""){
        return true;
    }
    return false;
}

function intializeAccordion(){
    $(".accordion").on("click", function() {
        $(this).toggleClass('active-a');
    });
}

function intializeDatePicker(){
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd'
      });
}

function intializeStepForm() {
    var navListItems = $('div.setup-panel div a'),
    panelData = $('.setup-content'),
    nextButtons = $('.nextBtn');

    panelData.hide();

    navListItems.click(function (e) {
    e.preventDefault();
    var $target = $($(this).attr('href')),
        $item = $(this);

    if (!$item.hasClass('disabled') ) {
        $item.addClass('btn-primary');
        panelData.hide();
        $target.show();
        $target.find('input:eq(0)').focus();
        }
    });

    nextButtons.click(function(){
    var curStep = $(this).closest(".setup-content"),
    curStepBtn = curStep.attr("id"),
    nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
    curInputs = curStep.find(':input','select'),
    isValid = true;

    $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
        if (!curInputs[i].validity.valid){
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
        }
    }

    if (isValid)
        nextStepWizard.removeAttr('disabled').trigger('click');
        nextStepWizard.removeClass('disabled');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
  }

function enableJobTitleOptions(){
    $('#jobtitle').removeAttr('disabled');
}

function enableAttendanceNumber(){
    $('#attendance-number').removeAttr('disabled');
}
function enableEmployeeNumber(){
    $('#employee-number').removeAttr('disabled');
}
function enableLeavePlan(){
    $('#leaveplan').removeAttr('disabled');
}
function enableProfessionalSummary(){
    var professionalTextArea = $('#professional-summary');
    var professionalLink = $('#edit-professional-summary');
    if(professionalTextArea.prop('disabled')){
        professionalLink.text('SAVE');
        professionalTextArea.removeAttr('disabled');
        professionalTextArea.toggleClass("txt-area");
    }
    else{
        professionalTextArea.attr('disabled',true);
        professionalLink.text('EDIT');
        professionalTextArea.toggleClass("txt-area");
    }
}
function enableExperience(){
    var expTextArea = $('#experience');
    var expLink = $('#edit-experience');
    if(expTextArea.prop('disabled')){
        expLink.text('SAVE');
        expTextArea.removeAttr('disabled');
        expTextArea.toggleClass("txt-area");

    }
    else{
        expTextArea.attr('disabled',true);
        expLink.text('EDIT');
        expTextArea.toggleClass("txt-area");
    }
}
function toggleSideNav() {
    $('#side-navbar').toggle();
}
