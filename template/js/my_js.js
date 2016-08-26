$(document).ready(function () {
    
    var allowedStatuses=[0,1,2]; // 0 - In work, 1 - Done, 2 - Delete : statuses for task or project
    var before_edit; // value of task ot project text before edit
    var before_edit_bool=false; // boolean wich show task ot project text in edit mode

// cut background for header and footer
    var divH = $("html").height();
    var divW = $("html").width();

    $(".head_div").css({
        'background-size'  : divW+'px '+divH+'px',
        'width' : divW+'px'
    });
    $(".copy_r").css({
        'background-size'  : divW+'px '+divH+'px',
        'width' : divW+'px'
    });
        $("body").css({
        'background-size'  : divW+'px '+divH+'px'
    });

// When window resize customize the background of header, body and footer
    $(window).resize(function(){
    
        var divH = $("body").height();
        var divW = $("body").width();
    
        $(".head_div").css({
            'background-size'  : divW+'px '+divH+'px',
            'width' : divW+'px'
        });
        
        $(".copy_r").css({
            'background-size'  : divW+'px '+divH+'px',
            'width' : divW+'px'
            });
        
        $("body").css({
            'background-size'  : divW+'px '+divH+'px'
        });
        
    });

// user Sign In or Sign Up
    $('body').on('click', '.submit-button, .reg-button', function(e){
      e.preventDefault();

      var enter_form=$(this).closest('form');
      var class_button=$(this).attr('class');
      if (class_button=='reg-button'){
        var text_url='/user/register';   
      }else{
        var text_url='/user/login';  
      }
      // Check the double-click
      var me = $(this);
      if ( me.data('requestRunning') ) {
          return;
      }

         $.ajax({
            data: enter_form.serialize(),
            url: text_url,
            method: 'post',
            beforeSend: function () {
                me.data('requestRunning', true);
                $('#loader').show();
            },
            success: function (data) {
                if (data){ 
                    var result_data = $.parseJSON(data);
                    var result_errors = false;
                    $.each(result_data, function(index, value){
                        if (value.replace(/\:.*/, '')=='Error'){
                            result_errors = true;
                            noty({
                                text: value,
                                type: 'error',
                                timeout: '3000'
                            });
                            $('#'+index).css('border-color','red');
                        }
                    });
                    if (!result_errors){
                        $.post("/projects", {}, function (data){
                            $('.head_div').after(data);
                            $('.menu').html(result_data['name_email']+', <a href="" id="log_out">Log out</a>');
                            $('.form-container').remove();
                            $(window).trigger('resize');
                            if (class_button=='reg-button'){
                                noty({
                                    text: 'You have successfully registered!',
                                    type: 'success',
                                    timeout: '1000'
                                }); 
                            }
                            if(result_data['name_email']=='test@test.com'){
                                noty({
                                    text: 'Click on the project title to see the tasks.',
                                    closeWith: ['button'],
                                    timeout: '5000'
                                });
                            }
                        });
                    }
                }
            },
            error: function(){
                noty({
                    text: 'Can not enter!',
                    type: 'error',
                    timeout: '2000'
                });  
            },
            complete: function(){
                me.data('requestRunning', false);
                $('#loader').hide();
            }
         });

    }); 

// log out
    $('body').on('click', '#log_out', function(e){
        e.preventDefault();

        // Check the double-click
        var me = $(this);
        if ( me.data('requestRunning') ) {
            return;
        }

        $.ajax({
            url: "/user/logout",
            method: 'post',
            beforeSend: function () {
                me.data('requestRunning', true);
                $('#loader').show();
            },
            success: function () {
                $('.main_div').remove();
                $('.menu').html('');
                $.post("/views/user/login.php", {}, function (data){
                    $('.head_div').after(data);
                });
                $(window).trigger('resize');
            },
            complete: function(){
                me.data('requestRunning', false);
                $('#loader').hide();
            }
         });
            
    }); 

// cancel red border of wrong data input (user Sign In or Sign Up) 
    $('body').on('keyup input', '.form-field', function(){

        $(this).css('border-color', '#c9b7a2');

    });

// get tasks of project   
    $('body').on('click', '.project .div_project_text, .project .project_icon', function(e){

        var container_tasks_id=$(this).closest('.container_tasks').attr('id');
        var project_border_id=$(this).closest('.div_project_border').attr('id');
        var project_tr=$(this).closest('.project');
        var id_project=container_tasks_id.replace(/[^0-9]/gim,'');
        // Check the double-click
        var me = $(this);
        if ( me.data('requestRunning') ) {
            return;
        }
        
        // check project contains the task
        if (!$("div").is("#container_tasks_"+id_project+" .add_task")){

            $.ajax({
                url: "/projects/"+id_project,
                method: 'post',
                beforeSend: function () {
                    me.data('requestRunning', true);
                    $('#loader').show();
                },
                success: function (data) {
                    project_tr.after(data);
                    $(window).trigger('resize');
                    if ($("div").is("#"+project_border_id+" .task")){
                        $("#"+project_border_id).css({
                            'border-radius' : '0px 0px 15px 15px'
                        });
                    }
                    
                    // descripe datepiker for deadline of task
                    $('.deadline_input').datepicker({
                        startDate: '01/01/2000',
                        dateFormat: 'yy-mm-dd',
                        firstDay: 1,
                        beforeShow: function() {
                            setTimeout(function(){
                                $('.ui-datepicker').css('z-index', 99999999999999);
                            }, 0);
                        },
                        onSelect:
                            function(dateText, inst) {

                                var container_deadline=$(this).closest('.div_edit_buttons').children(".div_deadline");
                                var task=$(this).closest('.task');
                                var id_task=task.attr('id').replace(/[^0-9]/gim,'');
                                // Check the double-click
                                var me_date = $(this);
                                if ( me_date.data('requestRunning') ) {
                                    return;
                                }

                                // change date by datepicker
                                if (dateText!=container_deadline.html()){

                                    $.ajax({
                                        data: {deadline:dateText},
                                        url: '/task/edit/'+id_task,
                                        method: 'post',
                                        beforeSend: function () {
                                            me_date.data('requestRunning', true);
                                            $('#loader').show();
                                        },
                                        success: function (data) {
                                            if (data){ 
                                                var result_data = $.parseJSON(data);
                                                var result_errors = false;
                                                $.each(result_data, function(index, value){         
                                                    if (value.replace(/\:.*/, '')=='Error'){
                                                        result_errors = true;
                                                        noty({
                                                            text: value,
                                                            type: 'error',
                                                            timeout: '1000'
                                                        }); 
                                                    }
                                                });
                                                if (!result_errors){
                                                    container_deadline.html(dateText);
                                                }
                                            }
                                        },
                                        error: function(){
                                            noty({
                                                text: 'Can not change the deadline!',
                                                type: 'error',
                                                timeout: '1000'
                                            });  
                                        },
                                        complete: function(){
                                            me_date.data('requestRunning', false);
                                            $('#loader').hide();
                                        }
                                     }); 
                                     
                                }
                            }
                    });
                    
                },
                error: function(){
                    noty({
                        text: 'Can not load tasks!',
                        type: 'error',
                        timeout: '1000'
                    });              
                },
                complete: function(){
                    me.data('requestRunning', false);
                    $('#loader').hide();
                }
                
            });            
        } else {

            $("#"+container_tasks_id+" .task, #"+container_tasks_id+" .add_task").remove();
            $("#"+project_border_id).css({
                'border-radius' : '0px 0px 0px 0px'
            });
            $(window).trigger('resize');

        }

    });  

// function wich replace div on textbox before edit project or task text        
    function divClicked(div) {
        
        var divHtml = $(div).html();
        var editableText = $('<textarea class="input_text"/>');
        
        editableText.val(divHtml);
        $(div).replaceWith(editableText);
        editableText.trigger('keyup');
        
        editableText.focus();
    }
    
// function wich replace textbox on div after edit project or task text    
    function editableTextBlurred(textarea, save, type, task_status) {
        var html = $(textarea).val();
        if (task_status){
            var viewableText = $('<div class="div_'+type+'_text_check">');
        }else{
            var viewableText = $('<div class="div_'+type+'_text">');
        }
    
        if (save){
            viewableText.html(html);
        }else{
            viewableText.html(before_edit);
        }
        $(textarea).replaceWith(viewableText);
    
    }

// change height of textbox according to content
    $('body').on('keyup input', '.input_text', function(){
        var offset = this.offsetHeight - this.clientHeight;
        $(this).css('height', 'auto').css('height', this.scrollHeight+offset);
    });

// check valid text of project or task    
    function checkText(val){
        
        if((val=="") || (val.length < 5) || (val.length > 250)) {
          return false;
        }else{
          return true;
        }
    
    }   
    
// project add 
    $('body').on('click', '.div_add_button_project button', function(e){
        e.preventDefault();
        
        before_div=$(this).closest('div');
        var insert_project='<div id="div_project_NEW" class="div_project_border">'+   
                                '<div id="container_tasks_NEW" class="container_tasks">'+
                                    '<div class="project" id="project_NEW">'+
                                        '<div class="project_icon">'+
                                            '<img src="/template/img/logo_p.png">'+
                                        '</div>'+
                                        '<div class="div_project_container"><div class="div_project_text"></div></div>'+
                                        '<div class="div_edit_buttons">'+
                                            '<div class="out_edit">'+
                                                '<a href="" class="edit"></a>'+
                                                '<a class="border_buttons"></a>'+
                                                '<a href="" class="del"></a>'+
                                            '</div>'+
                                            '<div class="in_edit">'+
                                                '<a href="" class="save"></a>'+
                                                '<a class="border_buttons"></a>'+
                                                '<a href="" class="cancel"></a>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';

        before_div.before(insert_project);
        $(window).trigger('resize');
        $("#project_NEW .edit").trigger('click');

    });

// lost focus after add task (cancel or add)   
    $('body').on('blur', '.add_task_input input', function(event){

      var container_tasks=$(this).closest('.container_tasks');
      var project_border_id=$(this).closest('.div_project_border').attr('id');
      var container_task_add=$(this).closest('.add_task');
      var id_project=container_tasks.attr('id').replace(/[^0-9]/gim,'');
      var textarea_text=$(this);
      var task_text=textarea_text.val();

         $(document).one('click', function(e) {

            var focused_element=$(e.target);

            if (focused_element.attr('class')=='save_add'){
               e.preventDefault();

               var errors = new Array();
               var successes = new Array();
               // Check the double-click
               var me = $(this);
               if ( me.data('requestRunning') ) {
                    return;
               }

               $.ajax({
                    data: {name:task_text, project:id_project},
                    url: '/task/add',
                    method: 'post',
                    beforeSend: function () {
                        me.data('requestRunning', true);
                        $('#loader').show();
                    },
                    success: function (data) {
                        if (data){ 
                            var result_data = $.parseJSON(data);
                            var result_errors = false;
                            $.each(result_data, function(index, value){
                                if (value.replace(/\:.*/, '')=='Error'){
                                    result_errors = true;
                                    noty({
                                        text: value,
                                        type: 'error',
                                        timeout: '1000'
                                    }); 
                                }else if (index!='taskId'){
                                    noty({
                                        text: value,
                                        type: 'success',
                                        timeout: '1000'
                                    }); 
                                }
                            });
                            if (!result_errors){
                                var priority_new=(container_tasks.find($("div.task")).length)+1;
                                var before_li=container_tasks.find($('[priority = '+(priority_new-1)+']'));
                                var d = new Date();
                                d.setDate(d.getDate() + 1);
                                var insert_task='<div priority="'+priority_new+'" class="task" id="task_'+result_data['taskId']+'">'+   
                                                    '<div class="div_check">'+
                                                        '<input id="check_'+result_data['taskId']+'" type="checkbox" class="task_status">'+
                                                        '<label for="check_'+result_data['taskId']+'"></label>'+
                                                    '</div>'+
                                                    '<div class="border_div"></div>'+
                                                    '<div class="div_task_container"><div class="div_task_text">'+task_text+'</div></div>'+
                                                    '<div class="div_edit_buttons">'+
                                                        '<div class="div_deadline">'+d.toJSON().slice(0,10)+'</div>'+
                                                        '<div class="out_edit">'+
                                                          '<div class="priority_buttons">'+
                                                              '<div class="up_task"></div> '+
                                                              '<div class="border_proirity"></div>'+
                                                              '<div class="down_task"></div> '+
                                                          '</div>'+
                                                          '<a class="border_buttons"></a>'+
                                                          '<a href="" class="edit"></a> '+
                                                          '<a class="border_buttons"></a>'+
                                                          '<input class="deadline_input" type="hidden" />'+
                                                          '<a href="" class="deadline"></a>'+
                                                          '<a class="border_buttons"></a>'+
                                                          '<a href="" class="del"></a> '+
                                                        '</div>'+
                                                        '<div class="in_edit">'+
                                                          '<a href="" class="save"></a> '+
                                                          '<a class="border_buttons"></a>'+
                                                          '<a href="" class="cancel"></a> '+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>';
                                if ((priority_new-1)==0){
                                    container_task_add.after(insert_task);
                                    $("#"+project_border_id).css({
                                        'border-radius' : '0px 0px 15px 15px'
                                    });
                                }else{
                                    before_li.before(insert_task);
                                }
                                $(window).trigger('resize');
                                
                                // descripe datepiker for deadline of task
                                $('#task_'+result_data['taskId']+' .deadline_input').datepicker({
                                    startDate: '01/01/2000',
                                    dateFormat: 'yy-mm-dd',
                                    firstDay: 1,
                                    beforeShow: function() {
                                        setTimeout(function(){
                                            $('.ui-datepicker').css('z-index', 99999999999999);
                                        }, 0);
                                    },
                                    onSelect:
                                        function(dateText, inst) {
            
                                            var container_deadline=$(this).closest('.div_edit_buttons').children(".div_deadline");
                                            var task=$(this).closest('.task');
                                            var id_task=task.attr('id').replace(/[^0-9]/gim,'');
                                            // Check the double-click
                                            var me_date = $(this);
                                            if ( me_date.data('requestRunning') ) {
                                                return;
                                            }
            
                                            // change date by datepicker
                                            if (dateText!=container_deadline.html()){
            
                                                $.ajax({
                                                    data: {deadline:dateText},
                                                    url: '/task/edit/'+id_task,
                                                    method: 'post',
                                                    beforeSend: function () {
                                                        me_date.data('requestRunning', true);
                                                        $('#loader').show();
                                                    },
                                                    success: function (data) {
                                                        if (data){ 
                                                            var result_data = $.parseJSON(data);
                                                            var result_errors = false;
                                                            $.each(result_data, function(index, value){         
                                                                if (value.replace(/\:.*/, '')=='Error'){
                                                                    result_errors = true;
                                                                    noty({
                                                                        text: value,
                                                                        type: 'error',
                                                                        timeout: '1000'
                                                                    }); 
                                                                }
                                                            });
                                                            if (!result_errors){
                                                                container_deadline.html(dateText);
                                                            }
                                                        }
                                                    },
                                                    error: function(){
                                                        noty({
                                                            text: 'Can not change the deadline!',
                                                            type: 'error',
                                                            timeout: '1000'
                                                        });  
                                                    },
                                                    complete: function(){
                                                        me_date.data('requestRunning', false);
                                                        $('#loader').hide();
                                                    }
                                                 }); 
                                                 
                                            }
                                        }
                                });
                                
                            }
                        }
                    },
                    complete: function(){
                        me.data('requestRunning', false);
                        $('#loader').hide();
                    }
                });
            
            }
            $(textarea_text).val('');
         });
    
    });   

// text of task or project go in edit mode 
    $('body').on('click', '.edit', function(e){
      e.preventDefault();
      
      var id_task_attr=$(this).closest('.task, .project').attr('id');
      var class_tr_attr=$(this).closest('.task, .project, .div_task_text_check').attr('class');
      if (!before_edit_bool){
        before_edit=$("#"+id_task_attr+" .div_"+class_tr_attr+"_text").text();
        before_edit_bool=true;
      }
      if ($("div").is("#"+id_task_attr+" .div_"+class_tr_attr+"_text")){
        var div_text=$("#"+id_task_attr+" .div_"+class_tr_attr+"_text");
      }else{
        var div_text=$("#"+id_task_attr+" .div_"+class_tr_attr+"_text_check");
      }

      divClicked(div_text);
      $("#"+id_task_attr+" .out_edit").attr('class','out_edit_nondisp');
      $("#"+id_task_attr+" .div_deadline").attr('class','div_deadline_nondisp');
      $("#"+id_task_attr+" .in_edit").css('display','inline-block');

    });

// cancel edit mode of text of task or project
    $('body').on('click', '.cancel', function(e){
      e.preventDefault();
    });  

// cancel action of link
    $('body').on('click', '.save_add', function(e){
      e.preventDefault();
    });

// lost focus after edit task or project (cancel or save)       
    $('body').on('blur', '.input_text', function(event){
      
      var id_task_attr=$(this).closest('.task, .project').attr('id');
      var class_attr=$(this).closest('.task, .project').attr('class');
      if (class_attr=='task'){
        var task_status=$('#'+id_task_attr+' .task_status').prop('checked');
      }else{
        var task_status=false;  
      }
      var textarea_text=$("#"+id_task_attr+" .input_text");
         
         $(document).one('click', function(e) {
            e.preventDefault();
 
            var focused_element=$(e.target);
 
            if (focused_element.attr('class')=='save'){

               var id_task=id_task_attr.replace(/[^0-9]/gim,'');
               if (id_task_attr=='project_NEW'){
                   url_str='/'+class_attr+'/add';
               }else{
                   url_str='/'+class_attr+'/edit/'+id_task;
               }
                // Check the double-click
               var me = $(this);
               if ( me.data('requestRunning') ) {
                    return;
               }
 
               if (checkText(textarea_text.val())){
                 if (textarea_text.val()!=before_edit){
 
                       $.ajax({
                          data: {name:textarea_text.val()},
                          url: url_str,
                          method: 'post',
                          beforeSend: function () {
                            me.data('requestRunning', true);
                            $('#loader').show();
                          },
                          success: function (data) {
                             if (data){ 
                                var result_data = $.parseJSON(data);
                                var result_errors = false;
                                $.each(result_data, function(index, value){
                                    if (value.replace(/\:.*/, '')=='Error'){
                                        result_errors = true;
                                        noty({
                                            text: value,
                                            type: 'error',
                                            timeout: '1000'
                                        }); 
                                    }else if (index!='projectId'){
                                        noty({
                                            text: value,
                                            type: 'success',
                                            timeout: '1000'
                                        }); 
                                    }
                                });
                                if (result_errors){
                                    editableTextBlurred(textarea_text, false, class_attr, task_status);
                                    $("#"+id_task_attr+" .in_edit").hide();
                                    $("#"+id_task_attr+" .out_edit_nondisp").attr('class','out_edit');
                                    $("#"+id_task_attr+" .div_deadline_nondisp").attr('class','div_deadline');
                     
                                    if ($("div").is("#div_project_NEW")){
                                        $('#div_project_NEW').remove();
                                        $(window).trigger('resize');
                                    }    
                                }else{
                                    editableTextBlurred(textarea_text, true, class_attr, task_status);
                                    $("#"+id_task_attr+" .in_edit").hide();
                                    $("#"+id_task_attr+" .out_edit_nondisp").attr('class','out_edit');
                                    $("#"+id_task_attr+" .div_deadline_nondisp").attr('class','div_deadline');
                                    //add project
                                    if (typeof result_data['projectId'] !=="undefined"){
                                        $('#div_project_NEW').attr('id', 'div_project_'+result_data['projectId']);
                                        $('#container_tasks_NEW').attr('id', 'container_tasks_'+result_data['projectId']);
                                        $('#project_NEW').attr('id', 'project_'+result_data['projectId']);
                                        $("#project_"+result_data['projectId']+" .div_project_text").trigger('click');
                                        $(window).trigger('resize');
                                    }
                                }
                             }
                          },
                          error: function(){
                              
                            editableTextBlurred(textarea_text, false, class_attr, task_status);
                            $("#"+id_task_attr+" .in_edit").hide();
                            $("#"+id_task_attr+" .out_edit_nondisp").attr('class','out_edit');
                            $("#"+id_task_attr+" .div_deadline_nondisp").attr('class','div_deadline');
             
                            if ($("div").is("#div_project_NEW")){
                                $('#div_project_NEW').remove();
                                $(window).trigger('resize');
                            }  
                          },
                          complete: function(){
                              me.data('requestRunning', false);
                              $('#loader').hide();
                          }
                       });

                 }
               }else{

                    noty({
                        text: 'Incorrect text of the '+class_attr+'! (the title should be more than 5 characters)',
                        type: 'error',
                        timeout: '1000'
                    });                    
                    
                    editableTextBlurred(textarea_text, false, class_attr, task_status);
                    $("#"+id_task_attr+" .in_edit").hide();
                    $("#"+id_task_attr+" .out_edit_nondisp").attr('class','out_edit');
                    $("#"+id_task_attr+" .div_deadline_nondisp").attr('class','div_deadline');
     
                    if ($("div").is("#div_project_NEW")){
                        $('#div_project_NEW').remove();
                        $(window).trigger('resize');
                    }
               }   
            }else{
                
                $(textarea_text).val(before_edit);
                editableTextBlurred(textarea_text, false, class_attr, task_status);
                before_edit_bool=false;
                
                if (focused_element.attr('class')=='edit'){
                  var id_task_focused_attr=$(focused_element).closest('.task, .project').attr('id');
                  var textarea_focused_text=$("#"+id_task_attr+" .input_text");
                  before_edit=$(textarea_focused_text).val();
                }
                
                $("#"+id_task_attr+" .in_edit").hide();
                $("#"+id_task_attr+" .out_edit_nondisp").attr('class','out_edit');
                $("#"+id_task_attr+" .div_deadline_nondisp").attr('class','div_deadline');
 
                if ($("div").is("#div_project_NEW")){
                    $('#div_project_NEW').remove();
                    $(window).trigger('resize');
                }
 
            }
         });
 
    });   

// check valid status of project or task    
    function checkStatus(val){
        
        if ($.inArray(val, allowedStatuses)>-1){
          return true;
        }else{
          return false;
        }
        
    }  

// change status of task

    // change the status by pressing on the title
    $('body').on('click', '.div_task_text_check, .div_task_text', function(){
        
        var id_task_attr=$(this).closest('.task').attr('id');
        $("#"+id_task_attr+" .task_status").trigger('click');
        
    });

    // change the status by pressing on the checkbox
    $('body').on('click', '.task_status', function(){

      var id_task_attr=$(this).closest('.task').attr('id');
      var id_task=id_task_attr.replace(/[^0-9]/gim,'');
      var status = $(this).prop('checked');
      var checkbox_edit=$(this);
      var me = $(this);
      if (!status){
        var new_status = 0;
        var old_status_bul = true;
      }else{
        var new_status = 1;
        var old_status_bul = false;
      }
      // Check the double-click
      if ( me.data('requestRunning') ) {
         return;
      }

      if (checkStatus(new_status)){

        $.ajax({
            data: {status:new_status},
            url: '/task/edit/'+id_task,
            method: 'post',
            beforeSend: function () {
                me.data('requestRunning', true);
                $('#loader').show();
            },
            success: function (data) {
                if (data){ 
                    var result_data = $.parseJSON(data);
                    var result_errors = false;
                    $.each(result_data, function(index, value){ 
                        if (value.replace(/\:.*/, '')=='Error'){
                            result_errors = true;
                            noty({
                                text: value,
                                type: 'error',
                                timeout: '1000'
                            }); 
                        }
                    });
                    if (result_errors){
                        checkbox_edit.prop('checked', old_status_bul);
                    }else{
                        if (old_status_bul){
                            $('#'+id_task_attr+' .div_task_text_check').attr('class', 'div_task_text');
                        }else{
                            $('#'+id_task_attr+' .div_task_text').attr('class', 'div_task_text_check');
                        }
                    }
                }
            },
            error: function(data){
                checkbox_edit.prop('checked', old_status_bul); 
            },
            complete: function(){
                me.data('requestRunning', false);
                $('#loader').hide();
            }
        }); 

      }else{
      
        noty({
            text: 'Invalid task status!',
            type: 'error',
            timeout: '1000'
        });                    
        checkbox_edit.prop('checked', old_status_bul);  
      
      }
      
    });

// delete task
    $('body').on('click', '.del', function(e){
      e.preventDefault();
     
      var id_project_attr=$(this).closest('.container_tasks').attr('id');
      var task_box=$(this).closest('.task, .project');
      var class_attr=task_box.attr('class');
      var id_task_attr=task_box.attr('id');
      var id_task=id_task_attr.replace(/[^0-9]/gim,'');
      // Check the double-click
      var me = $(this);
      if ( me.data('requestRunning') ) {
        return;
      }
      //  dialog box with question about remove element 
      noty({
    	text: 'Do you want to delete the '+class_attr+'?',
    	buttons: [
    		{addClass: 'dialog_button', 
    		 text: 'Ok', 
    		 onClick: function($noty) {
                    
                    $.ajax({
                        data: {status:"2"},
                        url: '/'+class_attr+'/edit/'+id_task,
                        method: 'post',
                        beforeSend: function () {
                            me.data('requestRunning', true);
                            $('#loader').show();
                        },
                        success: function (data) {
                            if (data){ 
                                var result_data = $.parseJSON(data);
                                var result_errors = false;
                                $.each(result_data, function(index, value){
                                    if (value.replace(/\:.*/, '')=='Error'){
                                        result_errors = true;
                                        noty({
                                            text: 'The '+class_attr+' is not deleted!',
                                            type: 'error',
                                            timeout: '1000'
                                        }); 
                                    }
                                });
                                if (!result_errors){
                                    if (class_attr=='task'){
                                        // update priority other tasks
                                        $("#"+id_project_attr+" .task").each(function() {
                                            var del_priority=parseInt(task_box.attr('priority'));
                                            var cur_priority=parseInt($(this).attr('priority'));
                                            if (cur_priority>del_priority){
                                                var new_priority=cur_priority-1;
                                                $(this).attr('priority', new_priority);
                                            }
                                        });
                                        // remove element
                                        task_box.remove();                                        
                                    }else{
                                        // remove element
                                        task_box.closest('.div_project_border').remove();   
                                    }
                                    $(window).trigger('resize');
                                    $noty.close();
                                    noty({
                                        text: 'The '+class_attr+' is deleted!',
                                        type: 'success',
                                        timeout: '1000'
                                    }); 
                                }
                            }
                        },
                        error: function(data){
                            noty({
                                text: 'The '+class_attr+' is not deleted!',
                                type: 'error',
                                timeout: '1000'
                            });     
                        },
                        complete: function(){
                            me.data('requestRunning', false);
                            $('#loader').hide();
                        }
                    });
                    
    		 }
    		},
    		{addClass: 'dialog_button',
    		 text: 'Cancel', 
    		 onClick: function($noty) {
    				$noty.close();
    			}
    		}
    	]
      });        
    
    }); 

// check valid priority of task
    function checkPriority(val, old_val, max){
      
      if ((val=old_val+1) || (val=old_val-1)){
        if ((val>0) && (val<=max)){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
      
    } 

// change priority of task to UP
    $('body').on('click', '.up_task', function(e){
      e.preventDefault();

      var container_tasks=$(this).closest('.container_tasks');
      var task=$(this).closest('.task');
      var id_task=task.attr('id').replace(/[^0-9]/gim,'');
      var kol_tasks=container_tasks.find($("div.task")).length;
      // Check the double-click
      var me = $(this);
      if ( me.data('requestRunning') ) {
          return;
      }
      if (parseInt(task.attr('priority'))<kol_tasks){

         var priority_new=parseInt(task.attr('priority'))+1;
         var before_li=container_tasks.find($('[priority = '+priority_new+']'));

         $.ajax({
            data: {priority:priority_new},
            url: '/task/edit/'+id_task,
            method: 'post',
            beforeSend: function () {
                me.data('requestRunning', true);
                $('#loader').show();
            },
            success: function (data) {
                if (data){ 
                    var result_data = $.parseJSON(data);
                    var result_errors = false;
                    $.each(result_data, function(index, value){
                        if (value.replace(/\:.*/, '')=='Error'){
                            result_errors = true;
                            noty({
                                text: value,
                                type: 'error',
                                timeout: '1000'
                            }); 
                        }
                    });
                    if (!result_errors){
                        before_li.before(task);
                        before_li.attr('priority', (priority_new-1));     
                        task.attr('priority', priority_new);  
                    }
                }
            },
            error: function(){
                noty({
                    text: 'Can not change priority of the task!',
                    type: 'error',
                    timeout: '1000'
                });  
            },
            complete: function(){
                me.data('requestRunning', false);
                $('#loader').hide();
            }

         });
      }

    }); 

// change priority of task to DOWN    
    $('body').on('click', '.down_task', function(e){
      e.preventDefault();

      var container_tasks=$(this).closest('.container_tasks');
      var task=$(this).closest('.task');
      var id_task=task.attr('id').replace(/[^0-9]/gim,'');
      // Check the double-click
      var me = $(this);
      if ( me.data('requestRunning') ) {
          return;
      }

      if (parseInt(task.attr('priority'))>1){

         var priority_new=parseInt(task.attr('priority'))-1;
         var after_li=container_tasks.find($('[priority = '+priority_new+']'));

         $.ajax({
            data: {priority:priority_new},
            url: '/task/edit/'+id_task,
            method: 'post',
            beforeSend: function () {
                me.data('requestRunning', true);
                $('#loader').show();
            },
            success: function (data) {
                if (data){ 
                    var result_data = $.parseJSON(data);
                    var result_errors = false;
                    $.each(result_data, function(index, value){
                        if (value.replace(/\:.*/, '')=='Error'){
                            result_errors = true;
                            noty({
                                text: value,
                                type: 'error',
                                timeout: '1000'
                            }); 
                        }
                    });
                    if (!result_errors){
                        after_li.after(task);
                        after_li.attr('priority', (priority_new+1));     
                        task.attr('priority', priority_new);  
                    }
                }
            },
            error: function(){
                noty({
                    text: 'Can not change priority of the task!',
                    type: 'error',
                    timeout: '1000'
                });  
            },
            complete: function(){
                me.data('requestRunning', false);
                $('#loader').hide();
            }
         });

      }

    }); 

// deadline of task 
    $('body').on('click', '.deadline', function(e){
        e.preventDefault();

        $(this).siblings('.deadline_input').datepicker("show");

    });
    
    
}); 
