import React from 'react';

const Returns = () => {
  return (
    <div className="mt-1">
      <div className="px-6 py-10 lg:px-8">
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] mx-auto space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-4xl">Returns Policy</h1>
          
          {/* General Policy Overview */}
          <section className="space-y-2">
            <p className="text-gray-700 text-base leading-relaxed">
              If you have any questions, give our helpful team a ring.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              You can return or exchange unwanted items within <strong>10 days of purchase</strong> if you decide it isn't right for you.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              Refunds will be made back to the <strong>original tender type</strong>.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              For in-store purchases with mixed payment methods, the refund will be processed in a specific order: first <strong>Gift Cards</strong>, then <strong>Credit/Debit Card</strong>, and <strong>cash</strong> will be the last amount to be refunded.
            </p>
          </section>

          {/* Conditions for Returns */}
          <section className="space-y-2">
            <ul className="space-y-2 list-disc list-inside text-gray-700 text-base leading-relaxed">
              <li>
                <strong>Item Condition:</strong> Be unused and in their original condition (including all packaging and tags intact).
              </li>
              <li>
                <strong>Proof of Purchase:</strong> Have proof of purchase such as receipt or order confirmation. Without proof of purchase, we are unable to provide a refund or exchange.
              </li>
              <li>
                <strong>Return Timeframe:</strong> The item must be returned within 10 days.
              </li>
            </ul>
          </section>

          {/* Customer Responsibility */}
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Customer Responsibility for Returns</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Customers must return the product(s) for which they are seeking a refund at their own cost.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              The customer must comply with the directions of DS Dryfruits staff in order to facilitate a refund or exchange.
            </p>
          </section>

          {/* Exceptions */}
          <section className="space-y-2">
            <div className="bg-amber-50 border-l-4 border-amber-700 p-4 my-4">
              <p className="text-gray-800 text-base leading-relaxed font-semibold mb-2">NOTE:</p>
              <p className="text-gray-700 text-base leading-relaxed">
                Items cannot be returned or exchanged for change of mind, incorrect product, incorrect colour choice, unless they are faulty, damaged or missing.
              </p>
            </div>
          </section>

          {/* Refund Processing */}
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Refund Processing</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              After receiving the returned Ds Dryfruits product(s), Ds Dryfruits will issue a refund as soon as is reasonably practicable, and the customer will be provided with e-mail acknowledgement.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              Where possible, refunds will be processed by reversing the initial customer transaction.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              DS Dryfruits accepts no responsibility for any delays that may occur in receiving the refund as a result of any third-party payment gateway.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Returns;

