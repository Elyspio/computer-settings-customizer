from os import listdir, path, unlink
from subprocess import call

# Constants
app = "generator.jar"
url = "https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.23/swagger-codegen-cli-3.0.23.jar"
url_swagger = "http://localhost:4000/swagger/swagger.json"
format = "typescript-axios"

folder = path.dirname(__file__)
api_folder = path.normpath(path.join(folder, "..", "src", "api", "core"))


def list_file_recursively(p: str, filtering: callable = None) -> list:
    files = listdir(p)
    if filtering is not None:
        files = list(filter(filtering, files))
    for f in files:
        file_p = path.join(p, f)
        if path.isdir(file_p):
            files.remove(f)
            files += map(lambda x: path.join(f, x), list_file_recursively(file_p, filtering))
    return files


def remove_non_typecript_files():
    generated_files = list_file_recursively(api_folder, lambda f: ".ts" not in f)
    for file in generated_files:
        file_path = path.join(api_folder, file)
        if path.isfile(file_path):
            unlink(file_path)


if app not in listdir(folder):
    print(f"Downloading swagger generator from {url})")
    call(f"wsl curl {url} -o {app}")


call(f"java -jar {app} generate -i {url_swagger} -l {format} -o {api_folder}")

remove_non_typecript_files()
