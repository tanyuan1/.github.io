//分页插件

function Page(ele, json) {
    this.target = document.querySelector(ele);
    this.pageIndex = 1; //默认显示第几页
    this.option = {
        count: 100, //假设有100条数据
        shownum: 5, //每页显示五条数据
        showpage: 7, //连续出现的页码是7条
        prevHtml: "上一页",
        nextHtml: "下一页",
        callback: function () {

        }
    }
    Object.assign(this.option, json); //更新数据
    this.create(); //构建分页的主体结构
    this.bindData(); //绑定数据


}

Page.prototype.bindData = function () {
    var that = this;
    var allPage = Math.ceil(this.option["count"] / this.option["shownum"])
    //21页
    var start = 1;
    var end = allPage > this.option["showpage"] ? this.option["showpage"] : allPage;

    var middleNum = Math.floor(this.option["showpage"] / 2); //3

    if (this.pageIndex > middleNum) {
        start = this.pageIndex - middleNum;
        end = this.pageIndex + middleNum;
    }
    if (this.pageIndex > allPage - middleNum) {
        start = allPage - this.option["showpage"] + 1;
        //10-6+1  因为6到10有五个数
        end = allPage;
    }
    start = start < 1 ? 1 : start;

    //总页码大于7 就是显示7  小于等于7 就是总页码数
    this.ul.innerHTML = "";
    for (var i = start; i <= end; i++) {
        var li = document.createElement("li");
        li.innerHTML = i;
        if (i == this.pageIndex) {
            li.className = "selected";
        }
        li.index = i; //做一个页码的数据属性

        li.onclick = function () { //页码的点击事件
            // this.pageIndex = this.index; this指向li
            that.pageIndex = this.index;
            that.bindData();
        }
        this.ul.appendChild(li);
    }

    //都绑定
    this.prevBtn.className = "default";
    this.prevBtn.onclick = function () {
        that.pageIndex--;
        that.bindData();

    }
    this.nextBtn.className = "default";
    this.nextBtn.onclick = function () {
        that.pageIndex++;
        that.bindData();
    }
    //在销毁
    if (this.pageIndex == 1) {
        this.prevBtn.onclick = null;
        this.prevBtn.className = "disabled";
    }
    if (this.pageIndex == allPage) {
        this.nextBtn.onclick = null;
        this.nextBtn.className = "disabled";
    }
    this.option["callback"](this.pageIndex);
}

Page.prototype.create = function () {

    this.target.className = "page"

    this.prevBtn = document.createElement("span");
    this.prevBtn.className = "page-prev";
    this.prevBtn.innerHTML = this.option["prevHtml"]
    this.target.appendChild(this.prevBtn);

    this.ul = document.createElement("ul");
    this.ul.className = "page-ul";
    this.target.appendChild(this.ul);

    this.nextBtn = document.createElement("span");
    this.nextBtn.className = "page-next";
    this.nextBtn.innerHTML = this.option["nextHtml"];
    this.target.appendChild(this.nextBtn);

}