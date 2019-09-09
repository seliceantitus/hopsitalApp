class MedicalUnit < ApplicationRecord
  self.inheritance_column = :_type_disabled
  validates :name, presence: true
  validates :type, presence: true
  validates :location, presence: true
  validates :logo, presence: true
end
