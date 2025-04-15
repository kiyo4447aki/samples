from datetime import datetime

video_tokens = {}

TOKEN_EXPIRATION_SECONDS = 60  # 10分

def cleanup_expired_tokens():
    now = datetime.now()
    expired_tokens = [token for token, data in video_tokens.items() if now > data["expires_at"]]
    for token in expired_tokens:
        del video_tokens[token]
    print(f"{len(expired_tokens)} 個のトークンを削除しました")