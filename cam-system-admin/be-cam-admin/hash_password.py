# backend/hash_password.py
import bcrypt
import sys

def main():
    try:
        if len(sys.argv) != 2:
            print("Usage: python hash_password.py <plain_password>")
            sys.exit(1)
        password = sys.argv[1].encode('utf-8')
        hashed = bcrypt.hashpw(password, bcrypt.gensalt())
        print("生成されたパスワードハッシュ:")
        print(hashed.decode('utf-8'))
    except Exception as e:
        print(f"ハッシュ生成中にエラーが発生しました: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
