import os
from datetime import datetime

ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'
BASE = len(ALPHABET)
ID_LENGTH = 6

def base36_to_int(s):
    #36進数の文字列を整数に変換
    return sum(ALPHABET.index(c) * (BASE ** i) for i, c in enumerate(reversed(s)))

def int_to_base36(n):
    #整数を36進数の文字列に変換（固定長）
    chars = []
    for _ in range(ID_LENGTH):
        n, r = divmod(n, BASE)
        chars.append(ALPHABET[r])
    return ''.join(reversed(chars))

def get_next_id(current_id):
    #現在のIDから次のIDを返す。最大値を超えたら000000に戻る
    if len(current_id) != ID_LENGTH or any(c not in ALPHABET for c in current_id):
        raise ValueError("無効なID形式です")

    current_index = base36_to_int(current_id)
    next_index = (current_index + 1) % (BASE ** ID_LENGTH)  # 巻き戻しも含む
    return int_to_base36(next_index)

def get_current_id(folder_path):
    #フォルダ内のファイルから有効な6桁IDのうち最大（末尾）のものを返す
    if not os.path.isdir(folder_path):
        raise ValueError("指定されたパスはフォルダではありません")

    files = os.listdir(folder_path)
    valid_ids = []

    for f in files:
        name, _ = os.path.splitext(f)
        if len(name) >= ID_LENGTH:
            candidate = name[:ID_LENGTH]
            if all(c in ALPHABET for c in candidate):
                valid_ids.append(candidate)

    if not valid_ids:
        return None

    return max(valid_ids, key=base36_to_int)

def generate_filename(folder_path):
    #次のIDと現在時刻からファイル名を生成
    current_id = get_current_id(folder_path)
    if current_id is None:
        next_id = int_to_base36(0)
    else:
        next_id = get_next_id(current_id)

    now = datetime.now()
    timestamp = now.strftime("%Y.%m.%d-%H:%M")
    filename = f"{next_id}-{timestamp}.mp4"
    return filename