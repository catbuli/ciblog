<template>
    <a class="miniTag"
       target="_blank"
       :href="href">
        {{content}}
    </a>
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
    padding: 3px 10px;
    color: white;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.6);
}
.miniTag + .miniTag {
    margin-left: 20px;
}
.miniTag:hover {
    color: white !important;
}
</style>