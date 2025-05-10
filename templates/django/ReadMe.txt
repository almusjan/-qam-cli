1- add the following code in package.json(scripts section):
    "build": "npx tailwindcss -o static/global/css/ts-build.css --minify",
    "dev": "npx tailwindcss -i static/global/css/tailwind.css -o static/global/css/main.css --watch"

2- in settings.py -- replace STATIC_URL = 'static/' with following code:
    STATIC_URL = "static/"
    STATICFILES_DIRS = [
        BASE_DIR / "static",
    ]
    STATIC_ROOT = BASE_DIR / "staticfiles"

3.once you create template folder add the following to base.html file:
    head:->
        <link rel="stylesheet" href="{% static 'qam_courses/css/main.css' %}"> (tailwind classes)
        <script src="https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js"></script> (theme changer library)
    body:->
        <script src="{% static 'qam_courses/js/flyonui.js' %}"></script>