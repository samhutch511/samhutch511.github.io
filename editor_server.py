#!/usr/bin/env python3
"""Local editor server. Usage: python editor_server.py"""

import base64
import re
import http.server
import json
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).parent
PORT = 4242


def save_and_commit(html: str, root: pathlib.Path = ROOT) -> str:
    """Write html to index.html, stage and commit. Returns 7-char hash."""
    (root / 'index.html').write_text(html, encoding='utf-8')
    subprocess.run(
        ['git', 'add', 'index.html', 'images/'],
        cwd=root, check=True, capture_output=True,
    )
    try:
        subprocess.run(
            ['git', 'commit', '-m', 'chore: update site content via editor'],
            cwd=root, check=True, capture_output=True,
        )
    except subprocess.CalledProcessError:
        # No changes to commit (identical content) — this is normal
        pass
    result = subprocess.run(
        ['git', 'rev-parse', '--short', 'HEAD'],
        cwd=root, capture_output=True, text=True, check=True,
    )
    return result.stdout.strip()


def save_image(file_data: bytes, filename: str, root: pathlib.Path = ROOT) -> str:
    """Write image bytes to images/<filename>. Returns relative path."""
    safe_name = pathlib.Path(filename).name  # strip any directory component
    if not safe_name or not re.match(r'^[\w.\-]+\.(jpg|jpeg|png|gif|webp|svg)$', safe_name, re.IGNORECASE):
        raise ValueError(f'Invalid image filename: {filename!r}')
    (root / 'images').mkdir(exist_ok=True)
    (root / 'images' / safe_name).write_bytes(file_data)
    return f'images/{safe_name}'


class EditorHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if self.path == '/save':
            self._handle_save()
        elif self.path == '/upload-image':
            self._handle_upload_image()
        else:
            self.send_error(404)

    def _handle_save(self):
        try:
            length = int(self.headers['Content-Length'])
            body = json.loads(self.rfile.read(length))
            commit_hash = save_and_commit(body['html'])
            self._send_json({'ok': True, 'hash': commit_hash})
        except Exception as e:
            self._send_json({'ok': False, 'error': str(e)})

    def _handle_upload_image(self):
        try:
            length = int(self.headers['Content-Length'])
            body = json.loads(self.rfile.read(length))
            file_data = base64.b64decode(body['data'])
            path = save_image(file_data, body['filename'])
            self._send_json({'ok': True, 'path': path})
        except Exception as e:
            self._send_json({'ok': False, 'error': str(e)})

    def _send_json(self, data):
        payload = json.dumps(data).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, fmt, *args):
        print(f'  {self.path}  {args[1]}')


if __name__ == '__main__':
    server = http.server.HTTPServer(('127.0.0.1', PORT), EditorHandler)
    print(f'Editor running at http://localhost:{PORT}')
    print(f'Open: http://localhost:{PORT}/editor.html')
    print('Ctrl+C to stop.')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nStopped.')
