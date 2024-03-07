from flask import Flask, request, jsonify, render_template
import colorama, json, requests
colorama.init(autoreset=False)
app = Flask(__name__)

def print_info(key, value):
    print(colorama.Fore.CYAN + key + ': ' + colorama.Fore.WHITE + str(value))


def get_ip_info(ip_address):
    try:
        response = requests.get(f'http://ip-api.com/json/{ip_address}')
        if response.status_code == 200:
            ip_info = response.json()
            print_info("     Country", ip_info.get("country"))
            print_info("     Country Code", ip_info.get("countryCode"))
            print_info("     Region", ip_info.get("region"))
            print_info("     Region Name", ip_info.get("regionName"))
            print_info("     City", ip_info.get("city"))
            print_info("     Zip Code", ip_info.get("zip"))
            print_info("     Latitude", ip_info.get("lat"))
            print_info("     Longitude", ip_info.get("lon"))
            print_info("     Timezone", ip_info.get("timezone"))
            print_info("     ISP", ip_info.get("isp"))
            print_info("     Organization", ip_info.get("org"))
            print_info("     AS", ip_info.get("as"))
        else:
            print(f"Error: {response.status_code}")
    except Exception as e:
        print(f"Error: {e}")

@app.route('/', methods=['POST', 'GET'])
def handle_data():
    if request.method == 'GET':
        return render_template("index.html")
    else:
        browser_info = request.json
        print(colorama.Fore.YELLOW + 'IP info:')
        print_info("     User IP", browser_info['ip'])
        get_ip_info(browser_info['ip'])
        
        print(colorama.Fore.YELLOW + '\nBrowser Info:')
        print_info('     User Agent', browser_info['userAgent'])
        print_info('     Browser Name', browser_info['browserName'])
        print_info('     Browser Version', browser_info['browserVersion'])
        print_info('     Platform', browser_info['platform'])
        print_info('     Language', browser_info['language'])
        print_info('     Cookies Enabled', browser_info['cookiesEnabled'])
        print_info('     Screen Width', browser_info['screenWidth'])
        print_info('     Screen Height', browser_info['screenHeight'])
        print_info('     Online Status', browser_info['onlineStatus'])
        print_info('     Do Not Track', browser_info['doNotTrack'])
        print_info('     Local Storage Enabled', browser_info['localStorageEnabled'])
        print_info('     Session Storage Enabled', browser_info['sessionStorageEnabled'])
        print_info('     Domain Name', browser_info['domainName'])
        print_info('     Is Phone', browser_info['isPhone'])
        print_info('     Dark Mode', browser_info['darkMode'])

        print(colorama.Fore.YELLOW + '\nPlugins:')
        for plugin in browser_info['plugins']:
            print_info('   - Name', plugin['name'])
            print_info('     Filename', plugin['filename'])
            print_info('     Description', plugin['description'])

        print(colorama.Fore.GREEN + '\nRequest Headers:')
        for key, value in request.headers.items():
            print_info('     '+key, value)
        print(colorama.Style.RESET_ALL)
        return 'thanks'
    
if __name__ == '__main__':
    app.run(debug=True)
