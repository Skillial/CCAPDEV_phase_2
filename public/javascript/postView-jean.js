function posthtml(postID, pauthor,ptitle,ppfp,pdesc,ppostedDate,peditedDate,prating,pmedia, preactValue, isCurrUserTheAuthor) {
    let 
    // content_list = document.createElement('div'),
    info_list = document.createElement('div'),
    topic = document.createElement('div'),
    headers = document.createElement('div'),
    span = document.createElement('span'),
    post = document.createElement('div'),
    post_img = document.createElement('span'),
    info = document.createElement('div'),
    pfp = document.createElement('img'),
    posted =document.createElement('p'),
    edited =document.createElement('p'),
    postedSpan=document.createElement('span'),
    editedSpan=document.createElement('span'),
    media = document.createElement('img'),
    comment_reply = document.createElement('div'),
    comment_share = document.createElement('div'),
    comment_edit = document.createElement('div'),
    comment_edited = document.createElement('div'),
    comment_save = document.createElement('div'),
    comment_text_area_save = document.createElement('div'),
    comment_text_area = document.createElement('textarea'),
    buttons = document.createElement('div'),
    comment_delete = document.createElement('div'),
    comment_cancel = document.createElement('div');
    
    comment_text_area.id = 'comment_text_area_id';
    // content_list.className = 'content_list';
    info_list.className = 'info_list';
    topic.className = 'topic';
    headers.className = 'headers';
    post.className = 'post';
    post_img.className = 'post_img';
    info.className = 'info';
    comment_reply.className='comment_reply';
    comment_share.className='comment_share';
    comment_edit.className='comment_edit';
    comment_edited.className='comment_edited';
    comment_save.className='comment_save';
    buttons.className='post_button';
    comment_text_area.className='comment_text_area';
    comment_text_area_save.className='comment_text_area_save';
    comment_delete.className = 'comment_delete';
    comment_cancel.className = 'comment_cancel';

    media.src = pmedia;
    pfp.src = ppfp;
    span.innerHTML = " &bull;posted by " + pauthor;
    span.style.cursor='pointer';
    span.appendChild(pfp);
    let header_title = document.createElement('p');
    header_title.textContent=ptitle+" ";
    headers.appendChild(header_title);
    headers.appendChild(span);
     topic.appendChild(headers);
    
    post_img.textContent=pdesc;
    // post_img.contentEditable = true; 
    post.appendChild(post_img);
    post.appendChild( document.createElement('br'));
    post.appendChild(media);
    topic.appendChild(post);
    posted.textContent= "Posted ";
    info.appendChild(posted);
    postedSpan.textContent=ppostedDate;
    info.appendChild(postedSpan);
    if (peditedDate !== '- Not Edited') {
        edited.textContent= "Edited ";
        info.appendChild(edited);
        editedSpan.textContent=new Date(peditedDate).toLocaleString();
        info.appendChild(editedSpan);
    }
    
    span.onclick = function(){
        window.location.href = `/profile/${pauthor}`;
    }
    comment_reply.textContent="Reply";
    comment_text_area_save.textContent="Save";
    comment_cancel.textContent="Cancel";


    comment_reply.addEventListener('click', () => {
        let textAreas = document.querySelectorAll('.comment_text_area');
        textAreas.forEach(textArea => {
            const parentElement = textArea.closest('.comment_wrapping');
            if (parentElement) {
              parentElement.removeChild(textArea);
            }
          });

        let commentSaves = document.querySelectorAll('.cancel_save_wrap');
        // Remove each comment save element from its parent "comment_wrapping" div
        commentSaves.forEach(commentSave => {
            const parentElement = commentSave.closest('.comment_wrapping');
            if (parentElement) {
                parentElement.removeChild(commentSave);
            }
        });
        const border = document.querySelector('.border');
        border.appendChild(comment_text_area);
        cancel_save_wrap = document.createElement('div');
        cancel_save_wrap.className='cancel_save_wrap';
        cancel_save_wrap.appendChild(comment_text_area_save);
        cancel_save_wrap.appendChild(comment_cancel);
        border.appendChild(cancel_save_wrap);
        comment_cancel.onclick=function(){
            border.removeChild(cancel_save_wrap);
            border.removeChild(comment_text_area);
        }
        comment_text_area_save.onclick=function(){
            let text_area_value = document.getElementById('comment_text_area_id');
            let newcomment = text_area_value.value;
            border.removeChild(comment_text_area);
            border.removeChild(cancel_save_wrap);
            // border.append(postreply(userID,"",newcomment,0,postID+1)); //change to currently logged in
            handleReply(postID,newcomment);
        }
      });

    comment_share.textContent="Share";
    comment_edit.textContent="Edit";
    comment_edited.textContent="Edited";
    comment_save.textContent="Save";
    comment_save.style.display = 'none';



    comment_edit.onclick = function() {
        comment_save.style.display = 'inline';
        post_img.contentEditable = true;
        post_img.style.border = '1px solid red';
        header_title.contentEditable = true;
        header_title.style.border = '1px solid red';      
        buttons.appendChild(comment_save);
      
        comment_save.onclick = function() {
          comment_save.style.display = 'none';
          post_img.contentEditable = false;
          post_img.style.border = 'none';
          header_title.contentEditable = false;
          header_title.style.border = 'none';
          
          // Save the content of post_img and header_title to variables
          var newDescription = post_img.innerHTML;
          var newTitle = header_title.innerHTML;
          handleEditPost(postID,newTitle,newDescription);
        };
      };


    comment_delete.onclick = function() {
        handleDeletePost(postID);
        // let commentDeleteElements = document.querySelectorAll('.content_list'); // Assuming 'content_list' is the class name of the elements you want to delete.
      
        // commentDeleteElements.forEach(function(element) {
        //   element.innerHTML = '';
        // });
      
        // commentDeleteElements = document.querySelectorAll('.comment_align'); // Assuming 'comment_align' is the class name of the elements you want to delete.
      
        // commentDeleteElements.forEach(function(element) {
        //   element.innerHTML = '';
        // });
      
        // const border = document.querySelector('.border'); // Assuming 'border' is the class name of the container element where you want to append the new div.
        // const topDiv = document.createElement('div');
        // const topicDiv = document.createElement('div');
        // topicDiv.classList.add('content_delete');
        // topicDiv.textContent = 'Content Deleted';
        // border.appendChild(topDiv);
        // topDiv.appendChild(topicDiv);
        // topDiv.style.display = 'flex';
        // topDiv.style.justifyContent = 'center';
        // topDiv.style.alignItems = 'center';
        // topDiv.style.position = 'fixed';
        // topDiv.style.top = '50%';
        // topDiv.style.left = '50%';
        // topDiv.style.transform = 'translate(-50%, -50%)';
        
      };


    comment_delete.textContent="Delete";
    if(isCurrUserTheAuthor=="true"){
        buttons.appendChild(comment_delete);
    }
    
    buttons.appendChild(comment_reply);
    // buttons.appendChild(comment_share);
    if(isCurrUserTheAuthor=="true"){
        buttons.appendChild(comment_edit);
    }
    
    

    // buttons.appendChild(comment_save);
    info_list.appendChild(createReaction(prating,preactValue,postID));
    info.appendChild(buttons);
    topic.appendChild(info);
    info_list.appendChild(topic);
    const buttonschildren = buttons.children;
    for (let i = 0; i < buttonschildren.length; i++) {
        buttonschildren[i].style.display = 'inline';
    }

    const infoChildren = info.children;
    for (let i = 0; i < infoChildren.length; i++) {
        infoChildren[i].style.display = 'inline';
    }
    
    return info_list;
    
}



// new reply / new comment
function postreply(pauthor,ppfp,pdesc,pcount,pid,user){
    let 
    comment_align = document.createElement('div'),
    comment_forum = document.createElement('div'),
    comment_container = document.createElement('div'),
    comment_profile = document.createElement('div'),
    comment_pfp = document.createElement('div'),
    pfp = document.createElement('img'),
    author =document.createElement('p'),
    comment_content_desc = document.createElement('div'),
    comment_react = document.createElement('div'),
    comment_reply = document.createElement('div'),
    comment_share = document.createElement('div'),
    comment_delete = document.createElement('div'),
    comment_edit = document.createElement('div'),
    comment_edited = document.createElement('div'),
    comment_save = document.createElement('div'),
    comment_text_area_save = document.createElement('div'),
    comment_text_area = document.createElement('textarea'),
    desc =document.createElement('p'),
    comment_wrapping = document.createElement('div'),
    comment_cancel = document.createElement('div');

    comment_text_area.id = 'comment_text_area_id';

    comment_align.className = 'comment_align';
    comment_forum.className = 'comment_forum';
    comment_container.className = 'comment_container';
    comment_profile.className = 'comment_profile';
    comment_pfp.className = 'comment_pfp';
    comment_content_desc.className = 'comment_content_desc';
    comment_react.className='comment_react';
    comment_reply.className='comment_reply';
    comment_share.className='comment_share';
    comment_edit.className='comment_edit';
    comment_edited.className='comment_edited';
    comment_save.className='comment_save';
    comment_text_area.className='comment_text_area';
    comment_text_area_save.className='comment_text_area_save';
    comment_wrapping.className='comment_wrapping';
    comment_delete.className='comment_delete';
    comment_cancel.className = 'comment_cancel';


    pfp.src = ppfp;
    comment_pfp.appendChild(pfp)
    author.textContent=pauthor;
    comment_profile.appendChild(comment_pfp);
    comment_profile.appendChild(author);
    comment_container.appendChild(comment_profile);
    desc.textContent=pdesc;
    comment_profile.style.cursor = 'pointer';
    comment_profile.onclick = function(){
      window.location.href = `/profile/${pauthor}`;
    }
    comment_content_desc.appendChild(desc);
    comment_delete.textContent="Delete";
    comment_reply.textContent="Reply";
    comment_text_area_save.textContent="Save";
    comment_cancel.textContent="Cancel";
    comment_reply.onclick = function(){
        let textAreas = document.querySelectorAll('.comment_text_area');
        // Remove each text area from its parent "comment_wrapping" div
        textAreas.forEach(textArea => {
            const parentElement = textArea.closest('.comment_wrapping');
            if (parentElement) {
            parentElement.removeChild(textArea);
            }else{
            const parentElement = textArea.closest('.border');
            parentElement.removeChild(textArea);
            }
        });
        
        let commentSaves = document.querySelectorAll('.cancel_save_wrap');
        // Remove each comment save element from its parent "comment_wrapping" div
        commentSaves.forEach(commentSave => {
            const parentElement = commentSave.closest('.comment_wrapping');
            if (parentElement) {
            parentElement.removeChild(commentSave);
            } else{
            const parentElement = commentSave.closest('.border');
            parentElement.removeChild(commentSave);
            }
        });
        comment_wrapping.appendChild(comment_text_area);
        cancel_save_wrap = document.createElement('div');
        cancel_save_wrap.className='cancel_save_wrap';
        cancel_save_wrap.appendChild(comment_text_area_save);
        cancel_save_wrap.appendChild(comment_cancel);
        comment_wrapping.appendChild(cancel_save_wrap);
        comment_cancel.onclick=function(){
            comment_wrapping.removeChild(cancel_save_wrap);
            comment_wrapping.removeChild(comment_text_area);
        }
        comment_text_area_save.onclick=function(){
            let text_area_value = document.getElementById('comment_text_area_id');
            let newcomment = text_area_value.value;
            comment_wrapping.removeChild(comment_text_area);
            comment_wrapping.removeChild(cancel_save_wrap);
            comment_align.append(postreply("poop bandit","../sample users/poop bandit.jpg",newcomment,0,pid+1));
                
        }
   
    }
    if (user==pauthor){
      comment_react.appendChild(comment_delete);
    }
    
    comment_react.appendChild(comment_reply);
    comment_share.textContent="Share";
    // comment_react.appendChild(comment_share);
    comment_edit.textContent="Edit";
    comment_edited.textContent="Edited";
    comment_save.textContent="Save";
    comment_delete.onclick = function() {
        author.textContent="Deleted";
        pfp.src="";
        desc.textContent="Deleted";
        count.textContent="Deleted";
    };
    comment_edit.onclick = function() {
        comment_save.style.display = 'block';
        desc.contentEditable = true; 
        comment_react.appendChild(comment_save);
        comment_content_desc.appendChild(comment_edited);
        comment_save.onclick=function(){
            comment_save.style.display = 'none';
            desc.contentEditable = false;
        }

    };
    if (user==pauthor){
      comment_react.appendChild(comment_edit);
    }
    
    comment_content_desc.appendChild(comment_react);
    comment_container.appendChild(comment_content_desc);
	comment_forum.appendChild(createReaction(pcount));
    comment_forum.appendChild(comment_container);
    comment_wrapping.appendChild(comment_forum);
    comment_align.appendChild(comment_wrapping);
    comment_align.id = pid;

	desc.setAttribute('align', 'justify');
    return comment_align;

}

function profpost(pauthor,ppfp,pdesc,pcount,pid,phtml){
    let 
    comment_align = document.createElement('div'),
    comment_forum = document.createElement('div'),
    comment_container = document.createElement('div'),
    comment_profile = document.createElement('div'),
    comment_pfp = document.createElement('div'),
    pfp = document.createElement('img'),
    author =document.createElement('p'),
    comment_content_desc = document.createElement('div'),
    comment_react = document.createElement('div'),
    comment_like = document.createElement('div'),
    comment_count = document.createElement('div'),
    comment_dislike = document.createElement('div'),
    comment_reply = document.createElement('div'),
    comment_share = document.createElement('div'),
    comment_delete = document.createElement('div'),
    comment_edit = document.createElement('div'),
    comment_edited = document.createElement('div'),
    comment_save = document.createElement('div'),
    comment_text_area_save = document.createElement('div'),
    comment_text_area = document.createElement('textarea'),
    desc =document.createElement('p'),
    comment_wrapping = document.createElement('div');

    comment_text_area.id = 'comment_text_area_id';

    comment_align.className = 'comment_align';
    comment_forum.className = 'comment_forum';
    comment_container.className = 'comment_container';
    comment_profile.className = 'comment_profile';
    comment_pfp.className = 'comment_pfp';
    comment_content_desc.className = 'comment_content_desc';
    comment_react.className='comment_react';
    comment_like.className='comment_like';
    comment_count.className='comment_count';
    comment_dislike.className='comment_dislike';
    comment_reply.className='comment_reply';
    comment_share.className='comment_share';
    comment_edit.className='comment_edit';
    comment_edited.className='comment_edited';
    comment_save.className='comment_save';
    comment_text_area.className='comment_text_area';
    comment_text_area_save.className='comment_text_area_save';
    comment_wrapping.className='comment_wrapping';
    comment_delete.className='comment_delete';

    pfp.src = ppfp;
    comment_pfp.appendChild(pfp)
    author.textContent=pauthor;
    comment_profile.appendChild(comment_pfp);
    comment_profile.appendChild(author);
    comment_container.appendChild(comment_profile);
    desc.textContent=pdesc;
    desc.onclick = function() {
        window.location.href = phtml;
    };
    desc.style.cursor = "pointer";
    comment_content_desc.appendChild(desc);
    comment_react.appendChild(comment_like);
    comment_count.textContent=pcount;
    comment_react.appendChild(comment_count);
    comment_react.appendChild(comment_dislike);
    comment_delete.textContent="Delete";
    comment_reply.textContent="Reply";
    comment_text_area_save.textContent="Save";
    comment_reply.onclick = function(){
        comment_wrapping.appendChild(comment_text_area);
        comment_wrapping.appendChild(comment_text_area_save);
        comment_text_area_save.onclick=function(){
            let text_area_value = document.getElementById('comment_text_area_id');
            let newcomment = text_area_value.value;
            comment_wrapping.removeChild(comment_text_area);
            comment_wrapping.removeChild(comment_text_area_save);
            comment_align.append(postreply(pauthor,ppfp,newcomment,0,pid+.1));
        }
    }
    comment_react.appendChild(comment_delete);
    comment_react.appendChild(comment_reply);
    comment_share.textContent="Share";
    comment_react.appendChild(comment_share);
    comment_edit.textContent="Edit";
    comment_edited.textContent="Edited";
    comment_save.textContent="Save";
    comment_delete.onclick = function() {
        author.textContent="Deleted";
        pfp.src="";
        desc.textContent="Deleted";
        count.textContent="Deleted";
    };
    comment_edit.onclick = function() {
        comment_save.style.display = 'block';
        desc.contentEditable = true; 
        comment_react.appendChild(comment_save);
        comment_content_desc.appendChild(comment_edited);
        comment_save.onclick=function(){
            comment_save.style.display = 'none';
            desc.contentEditable = false;
        }
    };
    comment_react.appendChild(comment_edit);
    // comment_content_desc.appendChild(comment_react);
    comment_container.appendChild(comment_content_desc);
    comment_forum.appendChild(comment_container);
    comment_wrapping.appendChild(comment_forum);
    comment_align.appendChild(comment_wrapping);
    comment_align.id = pid;
    return comment_align;

}

function handleReply(postID,replyContent) {
    if (replyContent) {
      // Send an HTTP request to your server to save the reply
      const requestBody = {
        content: replyContent,
        parentPostID: postID
      };
      fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          if (response.ok) {
            // Handle successful reply creation
            // Reload or update the comments section if needed
            window.location.href = "/post/" + encodeURIComponent(ptitle);
          } else {
            throw new Error('Failed to create reply');
          }
        })
        .catch(error => {
          console.error(error);
          // Handle error
        });
    }
  }


  function handleDeletePost(postID) {
    // Show a confirmation dialog before deleting the post
    if (confirm('Are you sure you want to delete this post?')) {
      // Send an HTTP request to your server to update the post data
      fetch(`/api/post/${postID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isDeleted: true })
      })
        .then(response => {
          if (response.ok) {
            window.location.href = "/post/" + encodeURIComponent(ptitle);
          } else {
            throw new Error('Failed to delete the post');
          }
        })
        .catch(error => {
          console.error(error);
          // Handle error
        });
    }
  }

  function handleEditPost(postID, newTitle,newDescription) {
  
    if (newTitle !== null || newDescription !== null) {
      // Send an HTTP request to update the post on the server
      const requestBody = {
        title: newTitle,
        content: newDescription
      };
  
      fetch(`/api/post/${postID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          if (response.ok) {
            // Handle successful post update
            // Reload the page to see the updated post details
            const encodedTitle = encodeURIComponent(newTitle); // Assuming newTitle is the updated title
            window.location.replace(`/post/${encodedTitle}`);
          } else {
            throw new Error('Failed to update post');
          }
        })
        .catch(error => {
          console.error(error);
          // Handle error
        });
    }
  }

  function handleDeleteComment(commentID) {
    // Show a confirmation dialog before deleting the commenttastatas
    if (confirm('Are you sure you want to delete this comment?')) {
      // Send an HTTP request to your server to update the commentt data
      fetch(`/api/post/${commentID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isDeleted: true })
      })
        .then(response => {
          if (response.ok) {
            window.location.reload();
          } else {
            throw new Error('Failed to delete the comment');
          }
        })
        .catch(error => {
          console.error(error);
          // Handle error
        });
    }
  }
  
  function handleEditComment(commentID, currentContent) {
    const newContent = prompt('Edit your comment content:', currentContent);
  
    if (currentContent !== null) {
      // Send an HTTP request to update the post on the server
      const requestBody = {
        content: newContent
      };
  
      fetch(`/api/post/${commentID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          if (response.ok) {
            window.location.reload();
          } else {
            throw new Error('Failed to update comment');
          }
        })
        .catch(error => {
          console.error(error);
          // Handle error
        });
    }
  }