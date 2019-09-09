class UnitType < ApplicationRecord
  self.inheritance_column = :_type_disabled
  validates :type, presence: true
end
