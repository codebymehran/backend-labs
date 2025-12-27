import random
from datetime import datetime, timedelta

num_lines = 5000

ips = ["192.168.1." + str(i) for i in range(1, 255)]
methods = ["GET", "POST", "PUT", "DELETE"]
resources = ["/", "/index.html", "/about", "/contact", "/api/data", "/login"]
statuses = [200, 201, 301, 302, 400, 401, 403, 404, 500]
user_agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Mozilla/5.0 (X11; Linux x86_64)",
    "curl/7.68.0",
    "PostmanRuntime/7.28.4"
]

start_time = datetime.now() - timedelta(days=30)

with open("access.log", "w") as f:
    for _ in range(num_lines):
        ip = random.choice(ips)
        method = random.choice(methods)
        resource = random.choice(resources)
        status = random.choice(statuses)
        user_agent = random.choice(user_agents)
        timestamp = start_time + timedelta(seconds=random.randint(0, 30*24*60*60))
        time_str = timestamp.strftime("%d/%b/%Y:%H:%M:%S +0000")

        f.write(
            f'{ip} - - [{time_str}] "{method} {resource} HTTP/1.1" '
            f'{status} {random.randint(100,5000)} "{user_agent}"\n'
        )

print("access.log generated with 5,000 lines")
