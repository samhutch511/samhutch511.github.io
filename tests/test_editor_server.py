import sys, pathlib, subprocess
sys.path.insert(0, str(pathlib.Path(__file__).parent.parent))
from editor_server import save_and_commit, save_image

def _make_git_repo(tmp_path):
    for cmd in [
        ['git', 'init'],
        ['git', 'config', 'user.email', 'test@test.com'],
        ['git', 'config', 'user.name', 'Test'],
    ]:
        subprocess.run(cmd, cwd=tmp_path, check=True, capture_output=True)
    (tmp_path / 'images').mkdir()
    (tmp_path / 'index.html').write_text('<html>original</html>')
    subprocess.run(['git', 'add', '.'], cwd=tmp_path, check=True, capture_output=True)
    subprocess.run(['git', 'commit', '-m', 'init'], cwd=tmp_path, check=True, capture_output=True)

def test_save_and_commit_writes_file(tmp_path):
    _make_git_repo(tmp_path)
    save_and_commit('<html>updated</html>', tmp_path)
    assert (tmp_path / 'index.html').read_text() == '<html>updated</html>'

def test_save_and_commit_returns_short_hash(tmp_path):
    _make_git_repo(tmp_path)
    h = save_and_commit('<html>v2</html>', tmp_path)
    assert len(h) == 7
    assert h.isalnum()

def test_save_image_writes_file(tmp_path):
    (tmp_path / 'images').mkdir()
    path = save_image(b'\x89PNG\r\n', 'avatar.jpg', tmp_path)
    assert path == 'images/avatar.jpg'
    assert (tmp_path / 'images' / 'avatar.jpg').read_bytes() == b'\x89PNG\r\n'

def test_save_image_prevents_path_traversal(tmp_path):
    (tmp_path / 'images').mkdir()
    path = save_image(b'data', '../evil.jpg', tmp_path)
    assert path == 'images/evil.jpg'
    assert not (tmp_path / 'evil.jpg').exists()
