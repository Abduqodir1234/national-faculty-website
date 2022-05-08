<h1>Database design</h1>
<a href="https://dbdiagram.io/d/625cb77a2514c9790345e2b7">Link</a>
<br>
<h1>To run project</h1>
<ol>
    <li>Run redis and mongodb using docker.yml in root project
    <br><br>
    <b>1.Run in root directory</b>
    <br>
    <code>docker-compose -f docker.yml up</code><br> <br>
    <b>2.Disable redis and mongodb in root directory in the end</b>
    <br>
    <code>docker-compose -f docker.yml down</code><br> <br>
    </li>
    <li>
         <b>Install dependencies</b>
          <br>
          <code>npm i</code>
    </li>
    <li>
        <b>Run project</b>
        <br>
        <b>1.Run project in seperate terminal</b>
        <br>
        <code>tsc && npm start</code>
        <br><br>
        <b>2.Run dev-mode project in seperate terminal</b>
        <br>
        <code>npm run dev</code>
    </li>
    
</ol>

<h1>Folder structure inside /src</h1>
<dl>
    <dt>src</dt>
    <dd> <b>- config</b> <div style="margin-left:80px;display:inline">=> Configs for project(Full description below)</div>
    </dd>
    <dd><b>- controllers</b> <div style="margin-left:48px;display:inline">=>  Controllers for routes(Full description below)</div>
    </dd>
    <dd><b>- loaders</b> <div style="margin-left:73px;display:inline">=> loaders for startup modules
    </div>
    </dd>
    <dd><b>- middlewares</b> <div style="margin-left:38px;display:inline">=> Middlewares(Full description below)
    </div>
    </dd>
    <dd><b>- models</b> <div style="margin-left:74px;display:inline">=> Models
    </div>
    </dd>
    <dd><b>- public</b> <div style="margin-left:81px;display:inline">=> Images
    </div>
    </dd>
    <dd><b>- routes</b> <div style="margin-left:78px;display:inline">=> Routes(Full description below)
    </div>
    </dd>
    <dd><b>- services</b> <div style="margin-left:67px;display:inline">=> Services(Full description below)
    </div>
    </dd>
</dl>

<h2>-Config folder</h2>
<p>All configuration files.<br><br>
<b>-index.ts </b> => main configuration file</p>
<b>-redis.ts</b>  => Configuration for redis

<h2>-controllers folder</h2>
<p>There are all controllers for views. All controllers are seperated according to their department</p>

<h2>-middlewares folder</h2>

<p>There are all middlewares.</p>
<dl>
    <dd><b> - fileupload</b>  <div style="display:inline; margin-left:20px">
       => this is for configuration and middlewares for file uploading with <b>Multer</b>
    </div>
    </dd>
    <dd><b> - joi</b>  <div style="display:inline; margin-left:70px">
       => this is middlewares and schemas for checking input body with <b>Joi</b>.
       All middlewares are seperated according to their department
    </div>
    </dd>
    <dd><b> - types</b>  <div style="display:inline; margin-left:50px">
       => There are typescript types.  All types are seperated according to their department
    </div>
    </dd>
</dl>

<h2>-routes folder</h2>

<p>All routes</p>
<dl>
    <dd><b> - index.ts</b>  <div style="display:inline; margin-left:20px">
       => This file is used to store all routes.
    </div>
    </dd>
</dl>
<p>Routes are seperated according to their groups</p>

<h2>-services folder</h2>

<p>Every department has its own service</p>