function divClicked(div) {
    var divHtml = $(div).html();
    var editableText = $('<textarea class="input_text" />');
    editableText.val(divHtml);
    var h_div = $(div).css('height');
    $(editableText).css('height',h_div);
    $(div).replaceWith(editableText);
    editableText.focus();
}

function editableTextBlurred(textarea) {
    var html = $(textarea).val();
    var viewableText = $('<div class="div_task_text">');
    viewableText.html(html);
    $(textarea).replaceWith(viewableText);
}

$(document).ready(function () {
    $('.div_tasks').on('keyup input', '.input_text', function(){
//        var offset = this.offsetHeight - this.clientHeight;
        var h_pad=$(this).css('paddingTop');
        h_pad=parseInt(h_pad.replace(/[^0-9]/gim,''));
        var scroll_h=this.scrollHeight+h_pad;
//        alert(scroll_h+' != '+ this.offsetHeight);
//        $(this).css('height', 'auto').css('height', this.scrollHeight + offset );
        $(this).css('height', '');
        if (scroll_h != this.offsetHeight){
//            alert(scroll_h+'+'+ h_pad+' != '+ this.offsetHeight);
            $(this).css('height', 'auto').css('height', this.scrollHeight);
        }
//        var scroll_h=this.scrollHeight+2;
//        var h= this.offsetHeight;
/*        if (scroll_h != this.offsetHeight){
            $(this).css('height', 'auto').css('height', this.scrollHeight + offset);
        }else{
            $(this).css({
                paddingTop: 0,
                height: 0
            });
            $(this).css({
                paddingTop: Math.max(0, h/2 - this.scrollHeight/2),
                height: h
            });
        } */
    });

    $('.div_tasks').on('click', '.del', function(e){
      e.preventDefault();
      var id_form=$(this).closest('form').attr('id');
      var id_task=id_form.replace(/[^0-9]/gim,'');
/*               $.ajax({
                  url: '/path/to/action',
                  method: 'post',
                  data: $(this).closest('form').serialize(),
                  success: function (data) {
                     if (data){ */
                        alert("Task "+id_task+" deleted!");  
/*                     }
                  }
               });*/

    });   

    $('.div_tasks').on('click', '.edit', function(e){
      e.preventDefault();
      var id_li=$(this).closest('li').attr('id');
      var div_text=$("#"+id_li+" .div_task_text");
      divClicked(div_text);
      $("#"+id_li+" .out_edit").hide();
      $("#"+id_li+" .in_edit").css('display','inline-block');
    });
    
    $('.div_tasks').on('click', '.cancel', function(e){
      e.preventDefault();
      var id_li=$(this).closest('li').attr('id');
      var div_text=$("#"+id_li+" .div_task_text");
      input_text.prop('disabled', true);
      $("#"+id_li+" .in_edit").hide();
      $("#"+id_li+" .out_edit").css('display','inline-block');
    });    
    
    $('.div_tasks').on('blur', '.input_text', function(event){
      var id_li=$(this).closest('li').attr('id');
      var textarea_text=$("#"+id_li+" .input_text");
         $(document).one('click', function(e) {
            var focused_element=$(e.target);
            if (focused_element.attr('class')=='save'){
               e.preventDefault();
               var id_task=id_li.replace(/[^0-9]/gim,'');
/*               $.ajax({
                  url: '/path/to/action',
                  method: 'post',
                  data: $(this).closest('form').serialize(),
                  success: function (data) {
                     if (data){ */
                        alert("Task "+id_task+" changed!");  
/*                     }
                  }
               });*/
            }
            editableTextBlurred(textarea_text);
            //input_text.prop('disabled', true);
            $("#"+id_li+" .in_edit").hide();
            $("#"+id_li+" .out_edit").css('display','inline-block');
         });
    });   

    $('.div_tasks').on('click', '.up_task', function(e){
      e.preventDefault();
      var parent_ul=$(this).closest('ul');
      var parent_li=$(this).closest('li');
      var kol_tasks=parent_ul.find($("li")).length;
      if (parseInt(parent_li.attr('priority'))<kol_tasks){
         var priority_new=parseInt(parent_li.attr('priority'))+1;
         var before_li=parent_ul.find($('[priority = '+priority_new+']'));
         before_li.before(parent_li);
         before_li.attr('priority', (priority_new-1));     
         parent_li.attr('priority', priority_new);
      }
    }); 
    
    $('.div_tasks').on('click', '.down_task', function(e){
      e.preventDefault();
      var parent_ul=$(this).closest('ul');
      var parent_li=$(this).closest('li');
      if (parseInt(parent_li.attr('priority'))>1){
         var priority_new=parseInt(parent_li.attr('priority'))-1;
         var after_li=parent_ul.find($('[priority = '+priority_new+']'));
         after_li.after(parent_li);
         after_li.attr('priority', (priority_new+1));     
         parent_li.attr('priority', priority_new);
      }
    }); 
   
    $(".project").click(function (e){
          e.preventDefault();
          var id=$(this).attr("data-id");
          if ($("#div_tasks_"+id).is(':empty')){
            $.post("/projects/"+id, {}, function (data){
                $("#div_tasks_"+id).html(data);
                $(".input_text").each(function() {
                   $(this).trigger('keyup');
                });
            });
            
          } else {
            $("#div_tasks_"+id).empty();
          }
    });
    
}); 
