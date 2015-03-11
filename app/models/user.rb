class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_session_token

  has_many :libraries,
    class_name: "Library",
    foreign_key: :user_id,
    primary_key: :id,
    inverse_of: :user

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil if user.nil?

    if user.is_password?(password)
      return user
    else
      return nil
    end
  end

  def password
    @password
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    self.session_token
  end

  protected

    def ensure_session_token
      self.session_token ||= SecureRandom::urlsafe_base64(16)
    end

end
