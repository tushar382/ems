<div class="container">
<h4 class="pheading">Profile</h4><br />
<img src=""  height="100px" width="100px" alt="user" /> <br> 
<b>${doc.data().displayName}</b>
<div>
<ul>
<li> <i class="material-icons prefix blue-text" style=" float: left;">email</i><p class="text1" style="text-align:left;">Email:${user.email}</p></li>
<li> <i class="material-icons prefix purple-text" style=" float: left;">call</i><p class="text1" style="text-align:left;">Contact:${doc.data().phoneno}</p></li>
<li><i class="material-icons prefix pink-text" style=" float: left;">male</i><p class="text1" style="text-align:left;" >Gender:${doc.data().gender}</p></li>
<li> <i class="material-icons prefix green-text" style=" float: left;">face</i><p class="text1" style="text-align:left;">Age:${doc.data().age}</p></li>
<li><i class="material-icons prefix yellow-text" style=" float: left;">description</i><p class="text1" style="text-align:left;">Bio:${doc.data().bio}</p></li>
<li> <i class="material-icons prefix brown-text" style=" float: left;">work</i><p class="text1" style="text-align:left;">Work Experience:${doc.data().workExperience}</p></li>
<li> <i class="material-icons prefix yellow-text" style=" float: left;">psychology</i><p class="text1" style="text-align:left;">Skills:${doc.data().skills}</p></li>
<li> <i class="material-icons prefix red-text" style=" float: left;">person</i><p class="text1" style="text-align:left;">${user.admin ? "Admin" : "User"}</p></li>
</ul>
</div>
</div>