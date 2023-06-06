import LazyLoad from "vanilla-lazyload";

new LazyLoad({
    elements_selector: "img.lazy",
    use_native: true // <-- there you go
});