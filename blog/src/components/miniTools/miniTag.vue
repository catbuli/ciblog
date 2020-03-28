<template>
    <div class="miniTag">
        <a target="_blank"
           :href="href">
            {{content}}
        </a>
    </div>
</template>

<script>
export default {
    name: "miniTag",
    props: {
        href: {
            type: String,
            default: "/"
        },
        content: {
            type: String,
            default: ""
        }
    }
};
</script>

<style scoped>
.miniTag {
    position: relative;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 3px 10px;
    border-radius: 0px 5px 5px 0px;
}
.miniTag a {
    height: 100%;
    color: white;
}
.miniTag::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: -27px;
    border: 13.5px solid transparent;
    border-right: 13.5px solid rgba(0, 0, 0, 0.6);
}
.miniTag::after {
    content: "•";
    display: block;
    position: absolute;
    top: 1px;
    left: -5px;
    color: white;
}
.miniTag a:hover {
    color: white !important;
}
.miniTag + .miniTag {
    margin-left: 25px;
}
</style>