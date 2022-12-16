const cancel = document.querySelector(".cancel");
const pluss_div = document.querySelector(".pluss_div");
const glass = document.querySelector(".glass");
const add = document.querySelector(".add");
const main = document.querySelector(".main");
const input_todo = document.querySelector(".input_todo");
const error = document.querySelector(".error");
const div_time = document.querySelector(".div_time");
const close_error = document.querySelector(".close_error");
var pluss_div_click = false;
var values = [];
var pen_select;
var status_done;
var str_circle;
let circle = document.querySelectorAll(".circle");

function complatet_fun(e) {
    for (let i = 0; i < localStorage.length; i++) {
        var member = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var status = member[5];
        var id_com = member[0]
        var todo_head = document.querySelectorAll('[data-id="' + id_com + '"]');
        if (todo_head[0].parentElement.parentElement == e.currentTarget.parentElement.parentElement) {
            if (status == false) {
                todo_head[0].classList.add("dno")
            } else {
                var todo_head = document.querySelectorAll('[data-id="' + id_com + '"]');
                todo_head[0].classList.remove("dno")
            }
        }
    }
}

function incompletet_fun(e) {
    for (let i = 0; i < localStorage.length; i++) {
        var member = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var status = member[5];
        var id_com = member[0];
        var todo_head = document.querySelectorAll('[data-id="' + id_com + '"]');
        if (todo_head[0].parentElement.parentElement == e.currentTarget.parentElement.parentElement) {
            if (status == true) {

                todo_head[0].classList.add("dno")
            } else {
                var todo_head = document.querySelectorAll('[data-id="' + id_com + '"]');
                todo_head[0].classList.remove("dno")
            }
        }
    }
}

function trash_svg_click(e) {
    console.log(e.currentTarget);
    var dataid = parseInt(e.currentTarget.parentElement.getAttribute("data-id"));
    for (let i = 0; i < localStorage.length; i++) {
        var local_id = localStorage.getItem(localStorage.key(i));
        var id = JSON.parse(local_id)[0];
        if (id == dataid) {
            localStorage.removeItem(localStorage.key(i));
            var h = e.currentTarget.parentElement.parentElement;
            e.currentTarget.parentElement.remove();
            if (h.childElementCount == 0) {
                h.parentElement.parentElement.remove();
            }
        }
    }
}

function circle_click(e) {
    if (!e.currentTarget.classList.contains("color_green")) {
        e.currentTarget.classList.add("color_green");
        e.currentTarget.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16 text-xs text-whiteCustom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>';
        e.currentTarget.nextElementSibling.classList.add("text_style");
        status_done = true;
    } else {
        e.currentTarget.classList.remove("color_green");
        e.currentTarget.innerHTML = '';
        e.currentTarget.nextElementSibling.classList.remove("text_style");
        status_done = false;
    }
    var id_complatet = e.currentTarget.parentElement.getAttribute("data-id");
    for (let r = 0; r < localStorage.length; r++) {
        var member = localStorage.getItem(localStorage.key(r));
        var id_member = JSON.parse(member)[0];
        if (id_member == id_complatet) {
            var complatet = [JSON.parse(member)[0], JSON.parse(member)[1], JSON.parse(member)[2], JSON.parse(member)[3], JSON.parse(member)[4], status_done];
            localStorage.setItem(localStorage.key(r), JSON.stringify(complatet));
        }
    }
}
pluss_div.addEventListener("click", function() {
    glass.classList.remove("dno");
    input_todo.value = "";
    pluss_div_click = true;
    add.innerHTML = "add";
})
cancel.addEventListener("click", function() {
    glass.classList.add("dno");
})
window.addEventListener("load", function() {
    debugger
    var len_local = localStorage.length;
    if (len_local != 0) {
        const exist_day = [];
        const exist_month = [];
        const exist_year = [];
        const d = new Date();
        var time = d.getTime();
        var t = 0;
        for (let y = 0; y < localStorage.length; y++) {
            if (localStorage.getItem("data" + t) != null) {
                values.push(localStorage.getItem("data" + t))
                t = t + 1;
            } else {
                t = t + 1;
                y = y - 1;
            }

        }
        localStorage.clear();
        for (let i = 0; i < values.length; i++) {
            localStorage.setItem("data" + i, values[i]);
        }
        console.log(values);
        for (let j = 0; j < localStorage.length; j++) {
            const day = document.querySelectorAll(".day");
            day.forEach(function(value, index) {
                if (exist_day.includes(parseInt(value.innerHTML)) == false) {
                    exist_day.push(parseInt(value.innerHTML));
                }
            })
            if (j >= 1) {
                var difference = JSON.parse(localStorage.getItem("data" + (j - 1))).filter(x => !JSON.parse(localStorage.getItem("data" + j)).includes(x));
                console.log(JSON.parse(localStorage.getItem("data" + j))[5]);
                if ((difference.length == 3 & typeof difference[1] == 'string') | difference.length == 2) {
                    const todos = document.querySelectorAll(".todos");
                    let str3 = `<div class="todo_head" data-id="${JSON.parse(localStorage.getItem("data"+j))[0]}">  
                        <svg version="1.1" class="pen" x="0px" y="0px" viewBox="0 0 277.141 277.141">
                        <path d="M274.804,58.127L219.013,2.335C217.507,0.829,215.498,0,213.356,0c-2.143,0-4.151,0.829-5.656,2.335L28.281,181.754
                            c-2.834,2.834-5.996,8.283-7.05,12.147l-20.95,76.817c-0.521,1.912-0.308,3.621,0.602,4.813c0.792,1.038,2.061,1.609,3.572,1.609
                            c0.619,0,1.28-0.095,1.964-0.281l76.818-20.951c3.865-1.054,9.314-4.216,12.147-7.049L274.804,69.44
                            c1.506-1.506,2.335-3.515,2.335-5.657C277.139,61.641,276.31,59.632,274.804,58.127z M65.155,235.776l-3.702,3.702
                            c-1.167,1.167-3.424,2.477-5.016,2.911l-26.926,7.343c-1.592,0.434-2.539-0.513-2.105-2.105l7.343-26.926
                            c0.434-1.592,1.744-3.849,2.911-5.016l3.702-3.702c1.167-1.167,3.076-1.167,4.243,0l19.549,19.549
                            C66.322,232.7,66.322,234.61,65.155,235.776z M221.367,76.985L109.119,189.233c-2.929,2.929-6.768,4.394-10.606,4.394
                            s-7.678-1.465-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213L200.154,55.772c5.857-5.857,15.355-5.857,21.213,0
                            C227.225,61.63,227.225,71.128,221.367,76.985z"/>
                        </svg>
                        <svg version="1.1" class="trash" viewBox="0 0 315 315">
                            <g>
                                <path d="m256.774,23.942h-64.836v-6.465c0-9.636-7.744-17.477-17.263-17.477h-34.348c-9.521,0-17.266,7.841-17.266,17.478v6.465h-64.835c-9.619,0-17.445,7.76-17.445,17.297v11.429c0,7.168 4.42,13.33 10.698,15.951 1.989,39.623 13.5,231.193 14.018,239.801 0.222,3.696 3.284,6.58 6.987,6.58h170.033c3.703,0 6.766-2.884 6.987-6.58 0.518-8.607 12.028-200.178 14.018-239.801 6.278-2.621 10.698-8.783 10.698-15.951v-11.43c5.68434e-14-9.537-7.826-17.297-17.446-17.297zm-119.713-6.464c0-1.918 1.465-3.478 3.266-3.478h34.348c1.8,0 3.264,1.56 3.264,3.478v6.465h-40.877v-6.465zm-82.282,23.761c0-1.818 1.546-3.297 3.445-3.297h198.549c1.899,0 3.445,1.478 3.445,3.297v11.429c0,1.819-1.546,3.299-3.445,3.299h-198.548c-1.899,0-3.445-1.479-3.445-3.299v-11.429zm181.143,259.761h-156.848c-2.055-34.247-11.479-191.674-13.51-231.033h183.867c-2.031,39.359-11.454,196.786-13.509,231.033z"/>
                                <path d="m157.5,95.125c-3.866,0-7,3.134-7,7v176.109c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-176.109c0-3.866-3.134-7-7-7z"/>
                                <path d="m110.2,102.04c-0.202-3.86-3.507-6.837-7.355-6.625-3.86,0.201-6.827,3.494-6.625,7.355l9.182,175.829c0.195,3.736 3.285,6.635 6.984,6.635 0.123,0 0.247-0.003 0.371-0.01 3.86-0.201 6.827-3.494 6.625-7.355l-9.182-175.829z"/>
                                <path d="m212.155,95.415c-3.899-0.223-7.153,2.764-7.355,6.625l-9.184,175.829c-0.202,3.861 2.765,7.154 6.625,7.355 0.125,0.007 0.248,0.01 0.371,0.01 3.698,0 6.789-2.898 6.984-6.635l9.184-175.829c0.202-3.861-2.764-7.154-6.625-7.355z"/>
                            </g>
                        </svg>
                            </div>`;
                    todos[day.length - 1].insertAdjacentHTML('afterbegin', str3);
                    if (JSON.parse(localStorage.getItem("data" + j))[5] == true) {
                        str_circle = `<span class="circle color_green"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16 text-xs text-whiteCustom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg></span><span class="text_span text_style">${JSON.parse(localStorage.getItem("data"+j))[4]}</span>`;
                    } else {
                        str_circle = `<span class="circle"></span><span class="text_span">${JSON.parse(localStorage.getItem("data"+j))[4]}</span>`;
                    }
                    var id_circle = JSON.parse(localStorage.getItem("data" + j))[0];
                    var todo_head_circle = document.querySelectorAll('[data-id="' + id_circle + '"]');
                    todo_head_circle[0].insertAdjacentHTML('afterbegin', str_circle);
                } else {
                    let todo_str = `
                    <div class="box_todo">
                        <div class="head_flex">
                            <div class="date">
                                <div class="day">${JSON.parse(localStorage.getItem("data"+j))[1]}</div>
                                <div class="right">
                                    <div class="month">${JSON.parse(localStorage.getItem("data"+j))[2]}</div>
                                    <div class="year">${JSON.parse(localStorage.getItem("data"+j))[3]}</div>
                                </div>
                            </div>
                            <div class="select"><span class="incompletet">incompletet task</span><span class="completet">completet task</span></div>
                            <div class="todos">
                                <div class="todo_head" data-id="${JSON.parse(localStorage.getItem("data"+j))[0]}">                            
                                    <svg version="1.1" class="pen" x="0px" y="0px"
                                    viewBox="0 0 277.141 277.141">
                                    <path d="M274.804,58.127L219.013,2.335C217.507,0.829,215.498,0,213.356,0c-2.143,0-4.151,0.829-5.656,2.335L28.281,181.754
                                        c-2.834,2.834-5.996,8.283-7.05,12.147l-20.95,76.817c-0.521,1.912-0.308,3.621,0.602,4.813c0.792,1.038,2.061,1.609,3.572,1.609
                                        c0.619,0,1.28-0.095,1.964-0.281l76.818-20.951c3.865-1.054,9.314-4.216,12.147-7.049L274.804,69.44
                                        c1.506-1.506,2.335-3.515,2.335-5.657C277.139,61.641,276.31,59.632,274.804,58.127z M65.155,235.776l-3.702,3.702
                                        c-1.167,1.167-3.424,2.477-5.016,2.911l-26.926,7.343c-1.592,0.434-2.539-0.513-2.105-2.105l7.343-26.926
                                        c0.434-1.592,1.744-3.849,2.911-5.016l3.702-3.702c1.167-1.167,3.076-1.167,4.243,0l19.549,19.549
                                        C66.322,232.7,66.322,234.61,65.155,235.776z M221.367,76.985L109.119,189.233c-2.929,2.929-6.768,4.394-10.606,4.394
                                        s-7.678-1.465-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213L200.154,55.772c5.857-5.857,15.355-5.857,21.213,0
                                        C227.225,61.63,227.225,71.128,221.367,76.985z"/></svg>
                                        <svg version="1.1" class="trash"  viewBox="0 0 315 315">
                                            <g>
                                                <path d="m256.774,23.942h-64.836v-6.465c0-9.636-7.744-17.477-17.263-17.477h-34.348c-9.521,0-17.266,7.841-17.266,17.478v6.465h-64.835c-9.619,0-17.445,7.76-17.445,17.297v11.429c0,7.168 4.42,13.33 10.698,15.951 1.989,39.623 13.5,231.193 14.018,239.801 0.222,3.696 3.284,6.58 6.987,6.58h170.033c3.703,0 6.766-2.884 6.987-6.58 0.518-8.607 12.028-200.178 14.018-239.801 6.278-2.621 10.698-8.783 10.698-15.951v-11.43c5.68434e-14-9.537-7.826-17.297-17.446-17.297zm-119.713-6.464c0-1.918 1.465-3.478 3.266-3.478h34.348c1.8,0 3.264,1.56 3.264,3.478v6.465h-40.877v-6.465zm-82.282,23.761c0-1.818 1.546-3.297 3.445-3.297h198.549c1.899,0 3.445,1.478 3.445,3.297v11.429c0,1.819-1.546,3.299-3.445,3.299h-198.548c-1.899,0-3.445-1.479-3.445-3.299v-11.429zm181.143,259.761h-156.848c-2.055-34.247-11.479-191.674-13.51-231.033h183.867c-2.031,39.359-11.454,196.786-13.509,231.033z"/>
                                                <path d="m157.5,95.125c-3.866,0-7,3.134-7,7v176.109c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-176.109c0-3.866-3.134-7-7-7z"/>
                                                <path d="m110.2,102.04c-0.202-3.86-3.507-6.837-7.355-6.625-3.86,0.201-6.827,3.494-6.625,7.355l9.182,175.829c0.195,3.736 3.285,6.635 6.984,6.635 0.123,0 0.247-0.003 0.371-0.01 3.86-0.201 6.827-3.494 6.625-7.355l-9.182-175.829z"/>
                                                <path d="m212.155,95.415c-3.899-0.223-7.153,2.764-7.355,6.625l-9.184,175.829c-0.202,3.861 2.765,7.154 6.625,7.355 0.125,0.007 0.248,0.01 0.371,0.01 3.698,0 6.789-2.898 6.984-6.635l9.184-175.829c0.202-3.861-2.764-7.154-6.625-7.355z"/>
                                            </g>
                                        </svg>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    main.insertAdjacentHTML('beforeend', todo_str);
                    var vaziat = JSON.parse(localStorage.getItem("data" + j))[5];
                    if (vaziat === true) {
                        str_circle = `<span class="circle color_green"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16 text-xs text-whiteCustom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg></span><span class="text_span text_style">${JSON.parse(localStorage.getItem("data"+j))[4]}</span>`;
                    } else {
                        str_circle = `<span class="circle"></span><span class="text_span">${JSON.parse(localStorage.getItem("data"+j))[4]}</span>`;
                    }
                    var id_circle = JSON.parse(localStorage.getItem("data" + j))[0];
                    var todo_head_circle = document.querySelectorAll('[data-id="' + id_circle + '"]');
                    todo_head_circle[0].insertAdjacentHTML('afterbegin', str_circle);
                }
            } else {
                let todo_str = `
                        <div class="box_todo">
                            <div class="head_flex">
                                <div class="date">
                                    <div class="day">${JSON.parse(localStorage.getItem("data"+j))[1]}</div>
                                    <div class="right">
                                        <div class="month">${JSON.parse(localStorage.getItem("data"+j))[2]}</div>
                                        <div class="year">${JSON.parse(localStorage.getItem("data"+j))[3]}</div>
                                    </div>
                                </div>
                                <div class="select"><span class="incompletet">incompletet task</span><span class="completet">completet task</span></div>
                                <div class="todos">
                                    <div class="todo_head" data-id="${JSON.parse(localStorage.getItem("data"+j))[0]}">                                     
                                        <svg version="1.1" class="pen" x="0px" y="0px"
                                        viewBox="0 0 277.141 277.141">
                                        <path d="M274.804,58.127L219.013,2.335C217.507,0.829,215.498,0,213.356,0c-2.143,0-4.151,0.829-5.656,2.335L28.281,181.754
                                            c-2.834,2.834-5.996,8.283-7.05,12.147l-20.95,76.817c-0.521,1.912-0.308,3.621,0.602,4.813c0.792,1.038,2.061,1.609,3.572,1.609
                                            c0.619,0,1.28-0.095,1.964-0.281l76.818-20.951c3.865-1.054,9.314-4.216,12.147-7.049L274.804,69.44
                                            c1.506-1.506,2.335-3.515,2.335-5.657C277.139,61.641,276.31,59.632,274.804,58.127z M65.155,235.776l-3.702,3.702
                                            c-1.167,1.167-3.424,2.477-5.016,2.911l-26.926,7.343c-1.592,0.434-2.539-0.513-2.105-2.105l7.343-26.926
                                            c0.434-1.592,1.744-3.849,2.911-5.016l3.702-3.702c1.167-1.167,3.076-1.167,4.243,0l19.549,19.549
                                            C66.322,232.7,66.322,234.61,65.155,235.776z M221.367,76.985L109.119,189.233c-2.929,2.929-6.768,4.394-10.606,4.394
                                            s-7.678-1.465-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213L200.154,55.772c5.857-5.857,15.355-5.857,21.213,0
                                            C227.225,61.63,227.225,71.128,221.367,76.985z"/></svg>
                                            <svg version="1.1" class="trash"  viewBox="0 0 315 315">
                                                <g>
                                                    <path d="m256.774,23.942h-64.836v-6.465c0-9.636-7.744-17.477-17.263-17.477h-34.348c-9.521,0-17.266,7.841-17.266,17.478v6.465h-64.835c-9.619,0-17.445,7.76-17.445,17.297v11.429c0,7.168 4.42,13.33 10.698,15.951 1.989,39.623 13.5,231.193 14.018,239.801 0.222,3.696 3.284,6.58 6.987,6.58h170.033c3.703,0 6.766-2.884 6.987-6.58 0.518-8.607 12.028-200.178 14.018-239.801 6.278-2.621 10.698-8.783 10.698-15.951v-11.43c5.68434e-14-9.537-7.826-17.297-17.446-17.297zm-119.713-6.464c0-1.918 1.465-3.478 3.266-3.478h34.348c1.8,0 3.264,1.56 3.264,3.478v6.465h-40.877v-6.465zm-82.282,23.761c0-1.818 1.546-3.297 3.445-3.297h198.549c1.899,0 3.445,1.478 3.445,3.297v11.429c0,1.819-1.546,3.299-3.445,3.299h-198.548c-1.899,0-3.445-1.479-3.445-3.299v-11.429zm181.143,259.761h-156.848c-2.055-34.247-11.479-191.674-13.51-231.033h183.867c-2.031,39.359-11.454,196.786-13.509,231.033z"/>
                                                    <path d="m157.5,95.125c-3.866,0-7,3.134-7,7v176.109c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-176.109c0-3.866-3.134-7-7-7z"/>
                                                    <path d="m110.2,102.04c-0.202-3.86-3.507-6.837-7.355-6.625-3.86,0.201-6.827,3.494-6.625,7.355l9.182,175.829c0.195,3.736 3.285,6.635 6.984,6.635 0.123,0 0.247-0.003 0.371-0.01 3.86-0.201 6.827-3.494 6.625-7.355l-9.182-175.829z"/>
                                                    <path d="m212.155,95.415c-3.899-0.223-7.153,2.764-7.355,6.625l-9.184,175.829c-0.202,3.861 2.765,7.154 6.625,7.355 0.125,0.007 0.248,0.01 0.371,0.01 3.698,0 6.789-2.898 6.984-6.635l9.184-175.829c0.202-3.861-2.764-7.154-6.625-7.355z"/>
                                                </g>
                                            </svg>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                main.insertAdjacentHTML('beforeend', todo_str);
                var vaziat = JSON.parse(localStorage.getItem("data" + j))[5];
                if (vaziat === true) {
                    str_circle = `<span class="circle color_green"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16 text-xs text-whiteCustom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg></span><span class="text_span text_style">${JSON.parse(localStorage.getItem("data"+j))[4]}</span>`;
                } else {
                    str_circle = `<span class="circle"></span><span class="text_span">${JSON.parse(localStorage.getItem("data"+j))[4]}</span>`;
                }
                var id_circle = JSON.parse(localStorage.getItem("data" + j))[0];
                var todo_head_circle = document.querySelectorAll('[data-id="' + id_circle + '"]');
                todo_head_circle[0].insertAdjacentHTML('afterbegin', str_circle);
            }
        }
        console.log("local");
        var todos_trash = document.querySelectorAll(".trash");
        var svg_todos = Array.from(todos_trash);;
        svg_todos.forEach(function(val, ind) {
            val.addEventListener("click", trash_svg_click)
        })
    }
    add.addEventListener("click", function() {
        if (pluss_div_click == true) {
            const exist_day = [];
            const exist_month = [];
            const exist_year = [];
            const d = new Date();
            var time = d.getTime();
            glass.classList.add("dno");
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let month_text = months[d.getMonth()];
            const day = document.querySelectorAll(".day");
            const month = document.querySelectorAll(".month");
            const year = document.querySelectorAll(".year");
            if (input_todo.value != "") {
                day.forEach(function(value, index) {
                    if (exist_day.includes(parseInt(value.innerHTML)) == false) {
                        exist_day.push(parseInt(value.innerHTML));
                    }
                })
                month.forEach(function(value, index) {
                    if (exist_month.includes(value.innerHTML) == false) {
                        exist_month.push(value.innerHTML);
                    }
                })
                year.forEach(function(value, index) {
                    if (exist_year.includes(parseInt(value.innerHTML)) == false) {
                        exist_year.push(parseInt(value.innerHTML));
                    }
                })
                if (!(exist_day.includes(d.getDate()) && exist_month.includes(month_text) && exist_year.includes(d.getFullYear()))) {
                    let str = ` 
                    <div class="box_todo">
                        <div class="head_flex">
                            <div class="date">
                                <div class="day">${d.getDate()}</div>
                                <div class="right">
                                    <div class="month">${month_text}</div>
                                    <div class="year">${d.getFullYear()}</div>
                                </div>
                            </div>
                            <div class="select"><span class="incompletet">incompletet task</span><span class="completet">completet task</span></div>
                            <div class="todos">
                                <div class="todo_head" data-id="${time}">
                                    <span class="circle"></span>
                                    <span class="text_span">${input_todo.value}</span>
                                    <svg version="1.1" class="pen" viewBox="0 0 277.141 277.141" >
                                <path d="M274.804,58.127L219.013,2.335C217.507,0.829,215.498,0,213.356,0c-2.143,0-4.151,0.829-5.656,2.335L28.281,181.754
                                    c-2.834,2.834-5.996,8.283-7.05,12.147l-20.95,76.817c-0.521,1.912-0.308,3.621,0.602,4.813c0.792,1.038,2.061,1.609,3.572,1.609
                                    c0.619,0,1.28-0.095,1.964-0.281l76.818-20.951c3.865-1.054,9.314-4.216,12.147-7.049L274.804,69.44
                                    c1.506-1.506,2.335-3.515,2.335-5.657C277.139,61.641,276.31,59.632,274.804,58.127z M65.155,235.776l-3.702,3.702
                                    c-1.167,1.167-3.424,2.477-5.016,2.911l-26.926,7.343c-1.592,0.434-2.539-0.513-2.105-2.105l7.343-26.926
                                    c0.434-1.592,1.744-3.849,2.911-5.016l3.702-3.702c1.167-1.167,3.076-1.167,4.243,0l19.549,19.549
                                    C66.322,232.7,66.322,234.61,65.155,235.776z M221.367,76.985L109.119,189.233c-2.929,2.929-6.768,4.394-10.606,4.394
                                    s-7.678-1.465-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213L200.154,55.772c5.857-5.857,15.355-5.857,21.213,0
                                    C227.225,61.63,227.225,71.128,221.367,76.985z"/></svg>
                                    <svg version="1.1"viewBox="0 0 315 315" class="trash">
                                        <g>
                                            <path d="m256.774,23.942h-64.836v-6.465c0-9.636-7.744-17.477-17.263-17.477h-34.348c-9.521,0-17.266,7.841-17.266,17.478v6.465h-64.835c-9.619,0-17.445,7.76-17.445,17.297v11.429c0,7.168 4.42,13.33 10.698,15.951 1.989,39.623 13.5,231.193 14.018,239.801 0.222,3.696 3.284,6.58 6.987,6.58h170.033c3.703,0 6.766-2.884 6.987-6.58 0.518-8.607 12.028-200.178 14.018-239.801 6.278-2.621 10.698-8.783 10.698-15.951v-11.43c5.68434e-14-9.537-7.826-17.297-17.446-17.297zm-119.713-6.464c0-1.918 1.465-3.478 3.266-3.478h34.348c1.8,0 3.264,1.56 3.264,3.478v6.465h-40.877v-6.465zm-82.282,23.761c0-1.818 1.546-3.297 3.445-3.297h198.549c1.899,0 3.445,1.478 3.445,3.297v11.429c0,1.819-1.546,3.299-3.445,3.299h-198.548c-1.899,0-3.445-1.479-3.445-3.299v-11.429zm181.143,259.761h-156.848c-2.055-34.247-11.479-191.674-13.51-231.033h183.867c-2.031,39.359-11.454,196.786-13.509,231.033z"/>
                                            <path d="m157.5,95.125c-3.866,0-7,3.134-7,7v176.109c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-176.109c0-3.866-3.134-7-7-7z"/>
                                            <path d="m110.2,102.04c-0.202-3.86-3.507-6.837-7.355-6.625-3.86,0.201-6.827,3.494-6.625,7.355l9.182,175.829c0.195,3.736 3.285,6.635 6.984,6.635 0.123,0 0.247-0.003 0.371-0.01 3.86-0.201 6.827-3.494 6.625-7.355l-9.182-175.829z"/>
                                            <path d="m212.155,95.415c-3.899-0.223-7.153,2.764-7.355,6.625l-9.184,175.829c-0.202,3.861 2.765,7.154 6.625,7.355 0.125,0.007 0.248,0.01 0.371,0.01 3.698,0 6.789-2.898 6.984-6.635l9.184-175.829c0.202-3.861-2.764-7.154-6.625-7.355z"/>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            </div>
                    </div>`;
                    main.insertAdjacentHTML('beforeend', str);
                    var tarikh = [time, d.getDate(), months[d.getMonth()], d.getFullYear(), input_todo.value, false];
                    values.push(JSON.stringify(tarikh));
                    localStorage.setItem("data" + (values.length - 1), JSON.stringify(tarikh));
                } else {
                    const todos = document.querySelectorAll(".todos");
                    let str3 = `
                    <div class="todo_head" data-id="${time}">
                        <span class="circle"></span>
                        <span class="text_span">${input_todo.value}</span>  
                        <svg version="1.1" class="pen" x="0px" y="0px" viewBox="0 0 277.141 277.141"">
                            <path d="M274.804,58.127L219.013,2.335C217.507,0.829,215.498,0,213.356,0c-2.143,0-4.151,0.829-5.656,2.335L28.281,181.754
                            c-2.834,2.834-5.996,8.283-7.05,12.147l-20.95,76.817c-0.521,1.912-0.308,3.621,0.602,4.813c0.792,1.038,2.061,1.609,3.572,1.609
                            c0.619,0,1.28-0.095,1.964-0.281l76.818-20.951c3.865-1.054,9.314-4.216,12.147-7.049L274.804,69.44
                            c1.506-1.506,2.335-3.515,2.335-5.657C277.139,61.641,276.31,59.632,274.804,58.127z M65.155,235.776l-3.702,3.702
                            c-1.167,1.167-3.424,2.477-5.016,2.911l-26.926,7.343c-1.592,0.434-2.539-0.513-2.105-2.105l7.343-26.926
                            c0.434-1.592,1.744-3.849,2.911-5.016l3.702-3.702c1.167-1.167,3.076-1.167,4.243,0l19.549,19.549
                            C66.322,232.7,66.322,234.61,65.155,235.776z M221.367,76.985L109.119,189.233c-2.929,2.929-6.768,4.394-10.606,4.394
                            s-7.678-1.465-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213L200.154,55.772c5.857-5.857,15.355-5.857,21.213,0
                            C227.225,61.63,227.225,71.128,221.367,76.985z"/>
                        </svg>
                        <svg version="1.1" viewBox="0 0 315 315" class="trash">
                            <g>
                            <path d="m256.774,23.942h-64.836v-6.465c0-9.636-7.744-17.477-17.263-17.477h-34.348c-9.521,0-17.266,7.841-17.266,17.478v6.465h-64.835c-9.619,0-17.445,7.76-17.445,17.297v11.429c0,7.168 4.42,13.33 10.698,15.951 1.989,39.623 13.5,231.193 14.018,239.801 0.222,3.696 3.284,6.58 6.987,6.58h170.033c3.703,0 6.766-2.884 6.987-6.58 0.518-8.607 12.028-200.178 14.018-239.801 6.278-2.621 10.698-8.783 10.698-15.951v-11.43c5.68434e-14-9.537-7.826-17.297-17.446-17.297zm-119.713-6.464c0-1.918 1.465-3.478 3.266-3.478h34.348c1.8,0 3.264,1.56 3.264,3.478v6.465h-40.877v-6.465zm-82.282,23.761c0-1.818 1.546-3.297 3.445-3.297h198.549c1.899,0 3.445,1.478 3.445,3.297v11.429c0,1.819-1.546,3.299-3.445,3.299h-198.548c-1.899,0-3.445-1.479-3.445-3.299v-11.429zm181.143,259.761h-156.848c-2.055-34.247-11.479-191.674-13.51-231.033h183.867c-2.031,39.359-11.454,196.786-13.509,231.033z"/>
                            <path d="m157.5,95.125c-3.866,0-7,3.134-7,7v176.109c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-176.109c0-3.866-3.134-7-7-7z"/>
                            <path d="m110.2,102.04c-0.202-3.86-3.507-6.837-7.355-6.625-3.86,0.201-6.827,3.494-6.625,7.355l9.182,175.829c0.195,3.736 3.285,6.635 6.984,6.635 0.123,0 0.247-0.003 0.371-0.01 3.86-0.201 6.827-3.494 6.625-7.355l-9.182-175.829z"/>
                            <path d="m212.155,95.415c-3.899-0.223-7.153,2.764-7.355,6.625l-9.184,175.829c-0.202,3.861 2.765,7.154 6.625,7.355 0.125,0.007 0.248,0.01 0.371,0.01 3.698,0 6.789-2.898 6.984-6.635l9.184-175.829c0.202-3.861-2.764-7.154-6.625-7.355z"/>
                            </g>
                        </svg>    
                    </div>`;
                    todos[day.length - 1].insertAdjacentHTML('afterbegin', str3);
                    var tarikh = [time, d.getDate(), months[d.getMonth()], d.getFullYear(), input_todo.value, false];
                    values.push(JSON.stringify(tarikh));
                    console.log(values);
                    localStorage.setItem("data" + (values.length - 1), JSON.stringify(tarikh));
                }
            } else {
                error.classList.remove("dno");
                div_time.style.animationName = "time";
                error.classList.add("right_error");
                div_time.addEventListener("animationend", function() {
                    error.classList.add("dno");
                })
            }
            var todos_trash = document.querySelectorAll(".trash");
            var svg_todos = Array.from(todos_trash);;
            svg_todos.forEach(function(val, ind) {
                val.addEventListener("click", trash_svg_click)
            })
            debugger
            var pen = document.querySelectorAll(".pen");
            pen.forEach(function(value, index) {
                value.addEventListener("click", function() {
                    var text = value.previousElementSibling.innerHTML;
                    glass.classList.remove("dno");
                    input_todo.value = text;
                    pen_select = value;
                    add.innerHTML = 'Edit';
                    // pluss_div_click=false;
                })
            })
            incompletet = document.querySelectorAll(".incompletet");
            completet = document.querySelectorAll(".completet");
            incompletet.forEach(function(value, index) {
                value.addEventListener("click", incompletet_fun)
            })
            completet.forEach(function(value, index) {
                value.addEventListener("click", complatet_fun)
            })
        } else {
            pen_select.previousElementSibling.innerHTML = input_todo.value;
            var id_pen = pen_select.parentElement.getAttribute("data-id");
            glass.classList.add("dno");
            for (let r = 0; r < localStorage.length; r++) {
                var member = localStorage.getItem(localStorage.key(r));
                var id_member = JSON.parse(member)[0];
                if (id_member == id_pen) {
                    var new_m = [JSON.parse(member)[0], JSON.parse(member)[1], JSON.parse(member)[2], JSON.parse(member)[3], input_todo.value, JSON.parse(member)[5]];
                    localStorage.setItem(localStorage.key(r), JSON.stringify(new_m));
                }
            }

        }
        pluss_div_click = false;
        add.innerHTML = "add";
        circle = document.querySelectorAll(".circle");
        circle.forEach(function(value, index) {
            value.addEventListener("click", circle_click)
        })
    })
    var pen = document.querySelectorAll(".pen");
    pen.forEach(function(value, index) {
        value.addEventListener("click", function() {
            console.log(pluss_div_click);
            var text = value.previousElementSibling.innerHTML;
            glass.classList.remove("dno");
            add.innerHTML = "Edit";
            input_todo.value = text;
            pen_select = value;
            circle = document.querySelectorAll(".circle");
            console.log("pen click");
            circle.forEach(function(value, index) {
                value.addEventListener("click", circle_click)
            })
        })
    })
    close_error.addEventListener("click", function() {
        error.classList.add("dno");
    })
    circle = document.querySelectorAll(".circle");
    circle.forEach(function(value, index) {
        value.addEventListener("click", circle_click)
    })
    var incompletet = document.querySelectorAll(".incompletet");
    var completet = document.querySelectorAll(".completet");
    incompletet.forEach(function(value, index) {
        value.addEventListener("click", incompletet_fun)
    })
    completet.forEach(function(value, index) {
        value.addEventListener("click", complatet_fun)
    })

})