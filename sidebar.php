<div id="mws-wrapper">
<!-- Necessary markup, do not remove -->
<div id="mws-sidebar-stitch"></div>
<div id="mws-sidebar-bg"></div>
<!-- Sidebar Wrapper -->
<div id="mws-sidebar">
   <!-- Main Navigation -->
   <div id="mws-navigation">
      <ul>
         <li <?php
            if ($page == 'portfolio') {
            ?> class="active"<?php
            }
            ?> >
            <a href="portfolio.php"><i class="icon-picassa"></i>Portfolio</a>
         </li>
         <li  <?php
            if ($page == 'category') {
            ?> class="active"<?php
            }
            ?> >
            <a href="category.php"><i class="icon-camera" ></i>Category</a>
         </li>
         <li  <?php
            if ($page == 'slider') {
            ?> class="active"<?php
            }
            ?> >
            <a href="slider.php"><i class="icon-pictures" ></i>Slider</a>
         </li>
         <li  <?php
            if ($page == 'about') {
            ?> class="active"<?php
            }
            ?> >
            <a href="about.php"><i class="icon-user" ></i>About</a>
         </li>
      </ul>
   </div>
</div>