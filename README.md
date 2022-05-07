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
        <b>Run project</b>
        <br>
        <b>1.Run project in seperate terminal</b>
        <br>
        <code>npm i && tsc && npm start</code>
        <br><br>
        <b>2.Run dev-mode project in seperate terminal</b>
        <br>
        <code>npm i && npm run dev</code>
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
    <dd><b>- loaders</b> <div style="margin-left:73px;display:inline">=> loaders for startup modules
    </div>
    </dd>
    <dd><b>- middlewares</b> <div style="margin-left:38px;display:inline">=> Middlewares(Full description below)
    </div>
    </dd>
    <dd><b>- models</b> <div style="margin-left:74px;display:inline">=> Models(Full description below)
    </div>
    </dd>
    <dd><b>- public</b> <div style="margin-left:81px;display:inline">=> Images(Full description below)
    </div>
    </dd>
    <dd><b>- routes</b> <div style="margin-left:78px;display:inline">=> Routes(Full description below)
    </div>
    </dd>
    <dd><b>- services</b> <div style="margin-left:67px;display:inline">=> Services(Full description below)
    </div>
    </dd>
</dl>