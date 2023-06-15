module Util
  class BraintreeHelper

    def self.get_braintree_plans
      Rails.cache.fetch("braintree-plans", expires_in: 5.minutes) do
        plans = Braintree::Plan.all
        plans_array = Array.new
        plans.each do |plan |
          plan_hash = {id: plan.id, name: plan.name, description: plan.description, price: plan.price, active: false}
          unless plan.add_ons.empty?
            plan_hash[:add_ons] = []
            plan.add_ons.each do |add_on|
              plan_hash[:add_ons] << {amount: add_on.amount, name: add_on.name, number_of_billing_cycles: add_on.number_of_billing_cycles}
            end
          end
          plans_array << plan_hash
        end

        plans_array
      end
    end

    def self.get_current_plan(braintree_plans, plan_id)
      braintree_plan = nil
      braintree_plans.each do |plan|
        unless plan_id.nil?
          if braintree_plan.nil?
            if plan_id.eql?(plan[:id])
              plan[:active] = true
              braintree_plan = plan
            end
          end
        end
      end

      braintree_plan
    end

  end
end