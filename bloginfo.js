import { request } from "./requestModule.js";
import { getUrlQueries } from "./getUrlQueriesModule.js";

const blogInfo = JSON.parse(request("./blogInfo.json"));
const genreExplanation = JSON.parse(request("./genreExplanation.json"));
const blogListUL = document.getElementById("blogListUL");
const children = (() => { const children = []; for (const child of blogListUL.children) children.push(child); return children; })();
for (const child of children) if (child.tagName === "LI") child.remove();

const { incompleteView } = getUrlQueries();
for (let i = 0; i !== Object.keys(blogInfo).length; i++) {
    const info = blogInfo[Object.keys(blogInfo)[i]];
    if (!(incompleteView === "true") && info.incomplete) continue;
    const markdownText = request("./markdownSource/" + i + ".md");
    const li = document.createElement("li");
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right");
    const title = document.createElement("p");
    const link = document.createElement("a");
    link.href = info.htmlBlogSourceIs ? "./htmlBlogSource/" + i + ".html" : "./view?blogNo=" + i;
    link.innerText = info.title;
    title.appendChild(link);
    leftDiv.appendChild(title);
    const box = document.createElement("span");
    box.classList.add("box");
    const textBox = document.createElement("span");
    textBox.classList.add("textBox");
    if (info.topImageName) {
        const img = document.createElement("img");
        img.src = "./markdownSource/" + i + "/" + info.topImageName;
        rightDiv.appendChild(img);
    }
    if (markdownText) {
        const blogContent = document.createElement("span");
        blogContent.classList.add("blogContent");
        blogContent.innerText = marked.parse(markdownText.split("\n")[0]).replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
        textBox.appendChild(blogContent);
    }
    const span = document.createElement("span");
    span.classList.add("miniInfo");
    const timestamp = document.createElement("span");
    timestamp.id = "timestamp";
    timestamp.innerText = info.timestamp;
    const popup = document.createElement("span");
    popup.classList.add("popup");
    const popupBody = document.createElement("span");
    popupBody.classList.add("popupBody");
    const timeArray = String(info.timestamp).split("/");
    popupBody.innerText = timeArray[0] + "年" + timeArray[1] + "月" + timeArray[2] + "日";
    popup.appendChild(popupBody);
    timestamp.appendChild(popup);
    span.appendChild(timestamp);
    const hyphen = document.createElement("span");
    hyphen.id = "hyphen";
    hyphen.innerText = "-";
    span.appendChild(hyphen);
    const genre = document.createElement("span");
    genre.id = "genre";
    genre.innerText = info.genre;
    if (genreExplanation[info.genre] && genreExplanation[info.genre].alt) {
        const popup = document.createElement("span");
        popup.classList.add("popup");
        const popupBody = document.createElement("span");
        popupBody.classList.add("popupBody");
        popupBody.innerText = "説明\n" + genreExplanation[info.genre].alt;
        popup.appendChild(popupBody);
        genre.appendChild(popup);
    }
    span.appendChild(genre);
    if (!info.created) {
        const hyphen = document.createElement("span");
        hyphen.id = "hyphen";
        hyphen.innerText = "-";
        span.appendChild(hyphen);
        const created = document.createElement("span");
        created.id = "created";
        created.innerText = "執筆中";
        const popup = document.createElement("span");
        popup.classList.add("popup");
        const popupBody = document.createElement("span");
        popupBody.classList.add("popupBody");
        popupBody.innerText = "説明\n現在作成中の記事の時にこの表記が表示されます。";
        popup.appendChild(popupBody);
        created.appendChild(popup);
        span.appendChild(created);
    };
    if (info.incomplete) {
        const hyphen = document.createElement("span");
        hyphen.id = "hyphen";
        hyphen.innerText = "-";
        span.appendChild(hyphen);
        const incomplete = document.createElement("span");
        incomplete.id = "incomplete";
        incomplete.innerText = "不完全な記事";
        const popup = document.createElement("span");
        popup.classList.add("popup");
        const popupBody = document.createElement("span");
        popupBody.classList.add("popupBody");
        popupBody.innerText = "説明\n記事の内容が未完全であったり不完全である時にこの表記が表示されます。";
        popup.appendChild(popupBody);
        incomplete.appendChild(popup);
        span.appendChild(incomplete);
    };

    textBox.appendChild(span);
    box.appendChild(textBox);
    leftDiv.appendChild(box);
    li.appendChild(leftDiv);
    li.appendChild(rightDiv);

    blogListUL.appendChild(li);


}
